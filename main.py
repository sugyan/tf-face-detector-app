import base64
import json
import os
import urllib.request
import tensorflow as tf
from flask import Flask, jsonify, render_template, request
from utils import process_results

MODEL_PATH = os.path.join('/', 'tmp', 'frozen_inference_graph.pb')

if not os.path.isfile(MODEL_PATH):
    print('model data not found')
    urllib.request.urlretrieve(os.environ['MODEL_DOWNLOAD_URL'], MODEL_PATH)

# restore graph
graph_def = tf.GraphDef()
with tf.gfile.GFile(MODEL_PATH, 'rb') as f:
    graph_def.ParseFromString(f.read())
tf.import_graph_def(graph_def, name='')

sess = tf.Session()
encoded_image = sess.graph.get_tensor_by_name('encoded_image_string_tensor:0')
fetches = {
    'boxes': sess.graph.get_tensor_by_name('detection_boxes:0'),
    'scores': sess.graph.get_tensor_by_name('detection_scores:0'),
    'classes': sess.graph.get_tensor_by_name('detection_classes:0'),
}

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


@app.route('/api/detect', methods=['POST'])
def detect():
    data = base64.b64decode(str(request.data).split(',', 1)[1])
    results = sess.run(fetches, feed_dict={encoded_image: [data]})
    detected = process_results(results['boxes'],
                               results['classes'],
                               results['scores'])
    return jsonify(results=detected)


@app.route('/')
def root():
    return render_template('index.html')
