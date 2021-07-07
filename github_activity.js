activity_boxes = [...document.getElementsByClassName('ContributionCalendar-day')]

activity_boxes.forEach(e => e.setAttribute("data-level", 0))

frame = 0

timer = setInterval(updateFrame, 1000/30)

imageWidth = arr[0][0].length
activityWidth = Math.floor(activity_boxes.length - 5)/7
startIndex = Math.floor((activityWidth - imageWidth)/2) * 7

function updateFrame() {
	if (frame >= arr.length) {
		clearInterval(timer)
		return
	}

	for (let i = 0; i < 7; ++i)
	    for (let j = 0; j < imageWidth; ++j)
		activity_boxes[startIndex+j*7+i].setAttribute("data-level",arr[frame][i][j])

	++frame
}
