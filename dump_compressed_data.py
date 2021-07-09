from PIL import Image
import numpy as np
import itertools
import base64
import json
from collections import Counter
from huffman import HuffmanTree

def get_ith_array(i):
	im = Image.open(f"video_frames/frame{i}.jpg").convert('L')
	new_width = round(frame_width * 7 / frame_height)
	im = im.resize((new_width, 7), Image.ANTIALIAS)
	factor = 256/5
	im = im.point(lambda x: x//factor)
	return np.array(im)

def bitstring_to_bytes(s):
    if len(s) % 8 > 0:
        s += '1' * (8 - len(s) % 8)
    return int(s, 2).to_bytes(len(s) // 8, byteorder='big')

frame_width, frame_height = Image.open(f"video_frames/frame0.jpg").size
arr_height, arr_width = get_ith_array(0).shape

counter = Counter({i: 0 for i in range(5)})

for i in itertools.count(start=0):
	try:
		arr = get_ith_array(i)
	except Exception:
		break
	counter.update(int(i) for i in arr.ravel())
tree = HuffmanTree(counter)
dic = tree.to_dict()
bitstring = ''
for i in itertools.count(start=0):
	try:
		arr = get_ith_array(i)
	except Exception:
		break
	bitstring += ''.join(dic[e] for e in arr.ravel())

bytes_data = bitstring_to_bytes(bitstring)
base64_str = base64.b64encode(bytes_data).decode('utf-8')

payload = {"size": (i, arr_height, arr_width),
	"data": base64_str,
	"dict": tree.rep
}

print(json.dumps(payload))
