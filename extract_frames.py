import cv2
import sys

video_file = sys.argv[1]
vidcap = cv2.VideoCapture(video_file)
success,image = vidcap.read()
count = 0
while success:
  cv2.imwrite("video_frames/frame%d.jpg" % count, image)     # save frame as JPEG file      
  success,image = vidcap.read()
  count += 1
