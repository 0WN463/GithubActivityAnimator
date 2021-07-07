from PIL import Image
import numpy as np
import itertools

def dump(arr):
	if isinstance(arr, np.uint8):
		print(arr, ',', end='')
		return
	print("[", end='')
	for i in arr:
		dump(i)
	print("],")

print('[', end='')

for i in itertools.count(start=0):
	try:
		im = Image.open(f"video_frames/frame{i}.jpg").convert('L')
	except Exception:
		break
	new_width = round(im.size[0] * 7 / im.size[1])
	im = im.resize((new_width, 7), Image.ANTIALIAS)
	factor = 256/5
	im = im.point(lambda x: x//factor)
	arr = np.array(im)
	dump(arr)

print("]")
