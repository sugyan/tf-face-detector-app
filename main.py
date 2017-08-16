import os
import tensorflow as tf
from flask import Flask, render_template

app = Flask(__name__)


@app.context_processor
def processor():
    def js(path):
        if 'FLASK_DEBUG' in os.environ:
            return '//localhost:8080/' + path
        else:
            return '/static/js/' + path
    return dict(js=js)


@app.route('/')
def root():
    return render_template('index.html')
