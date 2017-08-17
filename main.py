import json
import os
# import tensorflow as tf
from flask import Flask, render_template

manifest_path = os.path.join(os.path.dirname(__file__), 'static', 'js', 'manifest.json')
if os.path.exists(manifest_path):
    with open(manifest_path, 'r') as f:
        manifest = json.load(f)
app = Flask(__name__)


@app.context_processor
def processor():
    def js(path):
        if 'FLASK_DEBUG' in os.environ:
            return '//localhost:8080/' + path
        else:
            return '/static/js/' + manifest[path]
    return dict(js=js)


@app.route('/')
def root():
    return render_template('index.html')
