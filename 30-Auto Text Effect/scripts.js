const textEL = document.getElementById('text')
const speedEl = document.getElementById('speed')
const text = 'We Love Programming!'
let idx = 1
let speed = 300 / speedEl.value

writeText()

function writeText () {
	textEL.innerText = text.slice(0, idx)

	idx++

	if (idx > text.length) {
		idx = 1
	}

	setTimeout(writeText, speed)
}

speedEl.addEventListener('input', e => {
	if (e.target.value > 5) {
		e.target.value = 1
	}
	speed = 300 / e.target.value
})
