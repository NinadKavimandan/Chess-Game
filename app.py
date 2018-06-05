from flask import Flask, current_app, send_from_directory
from flask_cors import CORS
import json
import os

app = Flask(__name__, static_folder='static', static_url_path='/static')
CORS(app)

@app.route("/")
def index():
	return current_app.send_static_file('index.html')
	pass

'''@app.route("/80/<img>")
def return_images(img):
	root_dir = os.path.dirname(os.getcwd())
	return send_from_directory(os.path.join(root_dir, 'static', '80'), img)
'''
if __name__ == "__main__":
	app.run()