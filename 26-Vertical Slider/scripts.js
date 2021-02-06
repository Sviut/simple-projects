const sliderContainer = document.querySelector('.slider-container')
const slideRight = document.querySelector('.right-slide')
const slideLeft = document.querySelector('.left-slide')
const upButton = document.querySelector('.up-button')
const downButton = document.querySelector('.down-button')
const slidersLength = slideRight.querySelectorAll('div').length

let activeSlideIndex = 0

slideLeft.style.top = `-${(slidersLength - 1) * 100}vh`

upButton.addEventListener('click', () => changeSlide('up'))
downButton.addEventListener('click', () => changeSlide('down'))

document.addEventListener('keydown', (e) => {
	if (e.code === 'ArrowDown') {
		changeSlide('down')
	} else if (e.code === 'ArrowUp') {
		changeSlide('up')
	}
})

const changeSlide = (direction) => {
	const sliderHeight = sliderContainer.clientHeight
	if (direction === 'up') {
		activeSlideIndex++
		if (activeSlideIndex > slidersLength - 1) {
			activeSlideIndex = 0
		}
	} else if (direction === 'down') {
		activeSlideIndex--
		if (activeSlideIndex < 0) {
			activeSlideIndex = slidersLength - 1
		}
	}

	slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px`
	slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px`
}
