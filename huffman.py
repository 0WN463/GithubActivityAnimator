from collections import Counter

class HuffmanTree():
	def __init__(self, counter):
		while len(counter) > 1:
			(a_val, a_count), (b_val, b_count) = counter.most_common()[-2:]
			del counter[a_val]
			del counter[b_val]
			new_count = a_count + b_count
			new_symbol = (a_val, b_val)
			counter.update({new_symbol: new_count})

		self.rep, _ = counter.most_common()[0]

	def __repr__(self):
		return str(self.rep)

	def to_dict(self):
		self.mapping = {}
		self._walk(self.rep)
		return self.mapping

	def _walk(self, tup, prefix=""):
		a, b = tup
		if not isinstance(a, tuple):
			self.mapping[a] = prefix + "0"
		else:
			self._walk(a, prefix + "0")
		if not isinstance(b, tuple):
			self.mapping[b] = prefix + "1"
		else:
			self._walk(b, prefix + "1")
