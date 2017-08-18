# import numpy as np

SCORE_THRESHOLD = 0.5


def process_results(boxes,
                    classes,
                    scores):
    detected = []
    for i in range(min(20, boxes.shape[1])):
        if scores[0][i] > SCORE_THRESHOLD:
            detected.append({
                'bbox': tuple(boxes[0][i].tolist()),
                'class': int(classes[0][i]),
            })
    return detected
