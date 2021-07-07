FPS = 30
BOXES_PER_COL = 7

activity_boxes = [...document.getElementsByClassName('ContributionCalendar-day')]
activity_boxes.forEach(e => e.setAttribute("data-level", 0))

imageWidth = arr[0][0].length
activityWidth = Math.floor(activity_boxes.length - 5)/BOXES_PER_COL
startIndex = Math.floor((activityWidth - imageWidth)/2) * BOXES_PER_COL

frame = 0
timer = setInterval(updateFrame, 1000/FPS)

function updateFrame() {
	if (frame >= arr.length) {
		clearInterval(timer)
		return
	}

	for (let i = 0; i < BOXES_PER_COL; ++i)
	    for (let j = 0; j < imageWidth; ++j)
		activity_boxes[startIndex+j*BOXES_PER_COL+i].setAttribute("data-level",arr[frame][i][j])

	++frame
}
