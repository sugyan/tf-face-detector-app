# TF Face Detector

Web application for face-detection


## Prerequisite

- Python >= 3.x
  - TensorFlow >= 1.2
  - Flask >= 0.12
  - Gunicorn >= 19.7
- Node.js >= 6.x
  - React >= 15.6
  - TypeScript >= 2.4
  - webpack >= 3.5


## Setup

```
pip3 install -r requiements.txt
npm install
```

### URL for model download 

```
export MODEL_DOWNLOAD_URL=https://...
```


## Usage

```
gunicorn main:app
```
