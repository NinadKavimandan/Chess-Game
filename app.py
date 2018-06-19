from flask import render_template, Flask, current_app, session, url_for, redirect, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room
from forms import LoginForm
import json
from random import randint

app = Flask(__name__, static_folder='static', static_url_path='/static')
CORS(app)

ownname = ''
opponent = ''
colFlag = 0

app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app)
app.debug = True

@app.route("/")
def index():
	return current_app.send_static_file('index.html')
	pass

@app.route("/login", methods=['GET','POST'])
def login():
	form = LoginForm()
	if form.validate_on_submit():
		session['name'] = form.name.data
		session['room'] = 1
		return current_app.send_static_file('wait.html')
	form.name.data = session.get('name')
	return render_template('index.html', form=form)

@app.route("/play", methods=['POST'])
def play():
	session['name'] = request.form['name']
	session['opponent'] = request.form['opponent']
	session['selfCol'] = request.form['col']
	session['room'] = request.form['room']
	name = session.get('name')
	room = session.get('room')
	print (name)
	if name == '':
		return redirect(url_for('.index'))
	game = {}
	if session.get('selfCol')=="0":
		game['white'] = session.get('name')
		game['black'] = session.get('opponent')
	else:
		game['black'] = session.get('name')
		game['white'] = session.get('opponent')
	print (str(session))
	return render_template('play.html', game=game)

@socketio.on("nextMove")
def forwardNextMove(data):
	print (data)
	room = session.get('room')
	emit("incomingMove", str(json.dumps(data)), room=room)

@socketio.on("connected")
def updateLiveUserCnt():
	emit("newjoinee", {}, broadcast=True)

@socketio.on("ready")
def findFreePlayer():
	data = {}
	data['player'] = session.get("name")
	rNo = randint(0,100)
	session['room'] = rNo
	data['room'] = rNo
	join_room(rNo)
	emit('pairPlayer', str(json.dumps(data)), broadcast=True)

@socketio.on("pairFound")
def defineGame(data):
	data = json.loads(data)
	print (data)
	session['room'] = data['room']
	join_room(data['room'])
	session['opponent'] = data['player']
	cdata = {}
	cdata['name'] = session['name']
	cdata['color'] = randint(0,1)
	session['selfCol'] = cdata['color']
	emit('fetchOpponent', str(json.dumps(cdata)), room=data['room'])

@socketio.on("fetched")
def initGame(data):
	data = json.loads(data)
	session['opponent'] = data['name']
	session['selfCol'] = 1 - int(data['color'])
	print ('Color: ', data['color'])
	url = url_for('.play')
	ownname = session.get('name')
	opponent = session.get('opponent')
	colFlag = session.get('selfCol')
	session['url'] = url_for('.play')
	sdata = {}
	sdata['name'] = ownname
	sdata['opponent'] = opponent
	sdata['selfCol'] = colFlag
	sdata['room'] = session.get('room')
	sdata['url'] = url
	emit('beginGame', str(json.dumps(sdata)), room=session.get('room'))
	leave_room(sdata['room'])

@socketio.on("connectedToBoard")
def welcomePlayer():
	room = session.get('room')
	join_room(room)
	data = {}
	data['name'] = session.get('name')
	data['col'] = session.get('selfCol')
	emit("welcome", str(json.dumps(data)), room=room)

'''@socketio.on("queryExec")
def changeState():
	data = {}
	room = session.get('room')
	data['name'] = session.get('name')
	#emit("alterState", str(json.dumps(data)), room=room)
'''
if __name__ == "__main__":
	socketio.run(app)
