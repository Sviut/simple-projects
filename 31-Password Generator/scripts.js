const resultEL = document.getElementById('result')
const lengthEL = document.getElementById('length')
const uppercaseEL = document.getElementById('uppercase')
const lowercaseEL = document.getElementById('lowercase')
const numbersEL = document.getElementById('numbers')
const symbolsEL = document.getElementById('symbols')
const generateEL = document.getElementById('generate')
const clipboardEL = document.getElementById('clipboard')

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol,
}

clipboardEL.addEventListener('click', () => {
	const textarea = document.createElement('textarea')
	const password = resultEL.innerText

	if (!password) {
		return
	}
	textarea.value = password
	document.body.appendChild(textarea)
	textarea.select()
	document.execCommand('copy')
	textarea.remove()
	alert('Password copies to clipboard!')
})

generateEL.addEventListener('click', () => {
	const length = +lengthEL.value
	const hasLower = lowercaseEL.checked
	const hasUpper = uppercaseEL.checked
	const hasNumber = numbersEL.checked
	const hasSymbol = symbolsEL.checked

	resultEL.innerText = generatePass(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

function generatePass (lower, upper, number, symbol, length) {
	let generatedPassword = ''
	const typeCount = lower + upper + number + symbol
	const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0])

	if (typeCount === 0) {
		return ''
	}

	for (let i = 0; i < length; i += typeCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0]
			generatedPassword += randomFunc[funcName]()
		})
	}

	return generatedPassword.slice(0, length)
}

function getRandomLower () {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper () {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber () {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol () {
	const symbols = '!@#$%^&*(){}[],.<>/'
	return symbols[Math.floor(Math.random() * symbols.length)]
}
