FPS = 30
BOXES_PER_COL = 7

activity_boxes = [...document.getElementsByClassName('ContributionCalendar-day')]
activity_boxes.forEach(e => e.setAttribute("data-level", 0))

class Accumulator {
    constructor(dict) {
        this.root = build_tree(dict)
        this.position = this.root
    }

    update(bit) {
        this.position = bit ? this.position.right : this.position.left
        if (this.position.value != undefined) {
            const val = this.position.value
            this.position = this.root
            return val
        }
    }
}


if (compressedData) {
	acc = new Accumulator(compressedData.dict)
	bits = u_atob(compressedData.data).flatMap(e => [...Array(8).keys()].map(i => (1 << (8-(i+1))) & e))
	values = bits.map(e => acc.update(e)).filter(e => e !== undefined)
	videoArr = reshape(values, compressedData.size)
}

imageWidth = videoArr[0][0].length
activityWidth = Math.floor(activity_boxes.length - 5)/BOXES_PER_COL
startIndex = Math.floor((activityWidth - imageWidth)/2) * BOXES_PER_COL

frame = 0
timer = setInterval(updateFrame, 1000/FPS)

function updateFrame() {
	if (frame >= videoArr.length) {
		clearInterval(timer)
		return
	}

	for (let i = 0; i < BOXES_PER_COL; ++i)
	    for (let j = 0; j < imageWidth; ++j)
		activity_boxes[startIndex+j*BOXES_PER_COL+i].setAttribute("data-level",videoArr[frame][i][j])

	++frame
}

function build_tree(dict) {
    if (!dict.length)
        return {value: dict}

    return {left: build_tree(dict[0]), right: build_tree(dict[1])}
}

function u_atob(ascii) {
    return Array.from(atob(ascii), c => c.charCodeAt(0));
}

function reshape(data, size) {
    [frames, height, width] = size
    
    let arr = []
    let counter = 0
    for (let i = 0; i < frames; ++i) {
        arr[i] = []
        for (let j = 0; j < height; ++j) {
            arr[i][j] = []
            for (let k = 0; k < width; ++k) {
                arr[i][j][k] = data[counter++]
            }
        }
    }

    return arr
}
