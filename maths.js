const numberInput = document.querySelector('#num-input');
const calculateButton = document.querySelector('#calc-btn');
const clearButton = document.querySelector('#clear-btn');
const result1 = document.querySelector('#result1');
const result2 = document.querySelector('#result2');
const result3 = document.querySelector('#result3');
const primeSection = document.querySelector('.prime-number-calc');
const primeInput = primeSection.querySelector('#prime-input');
const factorsBtns = primeSection.querySelectorAll('.check-factors-btns');
let isStopped = true;
let currentRunId = 0;

calculateButton.addEventListener('click', (event) => {
	let square = Number(numberInput.value) ** 2;
	result1.textContent = ` ${square.toLocaleString()} is the square of ${numberInput.value}`;

	let cube = Number(numberInput.value) ** 3;
	result2.textContent = ` ${cube.toLocaleString()} is the cube of ${numberInput.value}`;

	let sqrt = Math.sqrt(Number(numberInput.value)).toFixed(2);
	result3.textContent = ` ${sqrt} is the square root of ${numberInput.value}`;
});

clearButton.addEventListener('click', (event) => {
	numberInput.value = '';
	result1.innerText = '';
	result2.innerText = '';
	result3.innerText = '';
});

// Converter code (using CoPilot)
document.querySelectorAll('.converter-section').forEach((section) => {
	const containers = section.querySelectorAll('.conv-container');
	if (containers.length === 2) {
		const container1 = containers[0];
		const container2 = containers[1];
		const select1 = container1.querySelector('select');
		const input1 = container1.querySelector('input');
		const select2 = container2.querySelector('select');
		const input2 = container2.querySelector('input');

		const isLength = section.classList.contains('first-converter');
		const isWeight = section.classList.contains('second-converter');
		const isTemp = section.classList.contains('third-converter');

		function getLengthFactor(unit) {
			const factors = {
				Mile: 1609.344,
				Kilometre: 1000,
				Metre: 1,
				Centimetre: 0.01,
				Millimetre: 0.001,
				Yard: 0.9144,
				Foot: 0.3048,
				Inch: 0.0254,
			};
			return factors[unit] || 1;
		}

		function getWeightFactor(unit) {
			const factors = {
				Kilogram: 1000,
				Gram: 1,
				Milligram: 0.001,
				Stone: 6350.29,
				Pound: 453.592,
				Ounce: 28.3495,
			};
			return factors[unit] || 1;
		}

		function convertTemp(val, from, to) {
			// Convert to Celsius first
			let c;
			if (from === 'Celsius') c = val;
			else if (from === 'Fahrenheit') c = ((val - 32) * 5) / 9;
			else if (from === 'Kelvin') c = val - 273.15;
			// Then to target
			if (to === 'Celsius') return c;
			else if (to === 'Fahrenheit') return (c * 9) / 5 + 32;
			else if (to === 'Kelvin') return c + 273.15;
			return val;
		}

		function updateFrom1() {
			const val1 = Number(input1.value);
			if (isNaN(val1) || input1.value === '') {
				input2.value = '';
				return;
			}
			if (isLength) {
				const factor1 = getLengthFactor(select1.value);
				const factor2 = getLengthFactor(select2.value);
				input2.value = ((val1 * factor1) / factor2).toFixed(2);
			} else if (isWeight) {
				const factor1 = getWeightFactor(select1.value);
				const factor2 = getWeightFactor(select2.value);
				input2.value = ((val1 * factor1) / factor2).toFixed(2);
			} else if (isTemp) {
				input2.value = convertTemp(val1, select1.value, select2.value).toFixed(
					2
				);
			}
		}

		function updateFrom2() {
			const val2 = Number(input2.value);
			if (isNaN(val2) || input2.value === '') {
				input1.value = '';
				return;
			}
			if (isLength) {
				const factor1 = getLengthFactor(select1.value);
				const factor2 = getLengthFactor(select2.value);
				input1.value = ((val2 * factor2) / factor1).toFixed(2);
			} else if (isWeight) {
				const factor1 = getWeightFactor(select1.value);
				const factor2 = getWeightFactor(select2.value);
				input1.value = ((val2 * factor2) / factor1).toFixed(2);
			} else if (isTemp) {
				input1.value = convertTemp(val2, select2.value, select1.value).toFixed(
					2
				);
			}
		}

		input1.addEventListener('input', updateFrom1);
		input2.addEventListener('input', updateFrom2);
		select1.addEventListener('change', () => {
			if (input1.value) updateFrom2();
			input1.placeholder = `Enter ${select1.value.toLowerCase()}`;
		});
		select2.addEventListener('change', () => {
			if (input2.value) updateFrom1();
			input2.placeholder = `Enter ${select2.value.toLowerCase()}`;
		});
	}
});

//Page background color change logic
document.querySelectorAll('.color-choose-wrapper > div').forEach((div) => {
	div.addEventListener('click', () => {
		let selectedColor = getComputedStyle(div).backgroundColor;
		document.body.style.backgroundColor = selectedColor;
	});
});

//Prime number calculations section
// Prime number logic
function divisibleByI(num, i) {
	if (num % i === 0) {
		return true;
	}
}
const isNotPrime = (number) => {
	if (number < 2) return false;
	if (number === 2) return true;
	for (let i = 2; i <= Math.sqrt(number); i++) {
		if (divisibleByI(number, i)) {
			return true;
		}
	}
	return false;
};
//For checking if a number is prime
function isPrimeSingle() {
	closePopup();
	//Declare variables
	const num = primeInput.value;
	const primeResult = primeSection.querySelector('#prime-result');
	//Verify valid number
	if (isNaN(num) || num.includes('.') || !num) {
		primeResult.textContent = 'Please enter an integer.';
		return;
	}
	//Check if prime and display accordingly
	if (isNotPrime(num)) {
		primeResult.textContent = `${num} is not a prime number.`;
		showFactorsBtn();
	} else {
		primeResult.textContent = `${num} is a prime number.`;
		hideFactorsBtn();
	}
}
//For checking all primes in a range
function isPrimeRange() {
	closePopup();
	//Assign elements to variables
	const start = primeSection.querySelector('#prime-range-start').value;
	const end = primeSection.querySelector('#prime-range-end').value;
	const result = primeSection.querySelector('#prime-range-result');
	//Verify numbers are valid
	if (
		isNaN(start) ||
		isNaN(end) ||
		start.includes('.') ||
		end.includes('.') ||
		!start ||
		!end ||
		Number(start) > Number(end)
	) {
		result.textContent = 'Please enter valid integers.';
		return;
	}
	//Declare values as an object literal
	const loopParams = {
		type: 'range',
		i: start,
		limit: end,
		interval: 100000,
		timerStart: performance.now(),
		runId: currentRunId,
		array: [],
		start,
	};
	//Loop through list and display popup
	isStopped = false;
	displayPopup();
	runBlock(loopParams);
}

//For checking all factors in a non-prime
function findFactors(form) {
	//Clear previous results
	closePopup();
	primeSection.querySelector('#factors-result').textContent = '';
	//Declare variables as an object
	const num = primeInput.value;
	const loopParams = {
		type: 'factors',
		num,
		i: 2,
		limit: form === 'short' ? Math.sqrt(num) : num - 1,
		interval: 100000,
		timerStart: performance.now(),
		runId: currentRunId,
		array: [],
		form,
	};
	//Verify input is non-prime
	if (!isNotPrime(loopParams.num)) {
		window.alert(`${loopParams.num} is a prime number`);
		return;
	}
	//Update state, run block and display popup
	isStopped = false;
	displayPopup();
	runBlock(loopParams);
}

//Logic for dealing with long loops/calculations
//Block of iterations as part of a loop
function runBlock(params) {
	let { type, num, i, limit, interval, runId, array } = params;
	//Verify process Id
	if (runId !== currentRunId) {
		return;
	}
	//First block runs
	for (let count = 1; count <= interval && i <= limit; count++) {
		if (type === 'factors') {
			if (divisibleByI(num, i)) {
				array.push(i);
			}
		} else if (type === 'range') {
			if (!isNotPrime(i)) {
				array.push(i);
			}
		}
		i++;
	}
	params.i = i;
	params.array = array;
	//Popup display functions
	if (i % 1000000 < 10000) {
		updateTimes(params);
	}
	updateProgress(params);
	//Restart the block or finish the loop
	if (isStopped) {
		return;
	}
	if (i < limit && !isStopped) {
		setTimeout(() => runBlock(params), 0);
	} else if (type === 'factors') {
		finishFactors(params);
	} else if (type === 'range') {
		finishRange(params);
	}
}
//Time remaining display to DOM
function updateTimes({ i, timerStart, limit, start = 0 }) {
	const timerEnd = performance.now();
	const elapsed = timerEnd - timerStart;
	const ratio = (limit - i) / (i - start);
	const msRemaining = elapsed * ratio;
	const timeRemaining = displayTime(msRemaining);
	document.querySelector('.remaining-time').textContent =
		`Estimated time remaining: ${timeRemaining}`;
}
//Progress display to DOM
function updateProgress({ i, limit, start = 0 }) {
	let progress = ((i - start) / limit) * 100;
	document.querySelector('.percentage').textContent =
		`Progress: ${progress.toFixed(2)}%`;
	const progressEl = document.querySelector('.progress');
	progressEl.style.width = `${progress}%`;
}
//Display results in DOM
function finishRange({ start, end, array }) {
	const result = primeSection.querySelector('#prime-range-result');
	result.innerHTML = `<strong>${array.length} prime numbers between ${start} and ${end}</strong>: ${array.join(', ')}`;
	adjustTextSize(array, result);
	hidePopup();
}
function finishFactors({ array, limit, num, form }) {
	const factorsResult = primeSection.querySelector('#factors-result');
	let factorsAmt = array.length;
	if (form === 'short') {
		factorsAmt = array.length * 2;
		if (limit % 1 === 0) {
			factorsAmt--;
		}
	}
	factorsResult.innerHTML = `<strong>${factorsAmt} factors of ${num}</strong>: ${array.join(', ')}`;
	adjustTextSize(array, factorsResult);
	hidePopup();
}
//Calculate popup hide/show functions
function displayPopup() {
	const popup = document.querySelector('.calc-popout');
	popup.classList.remove('hidden');
	popup.classList.add('grid');
}
function hidePopup() {
	const popup = document.querySelector('.calc-popout');
	popup.classList.remove('grid');
	popup.classList.add('hidden');
	popup.querySelectorAll('p').forEach((p) => (p.innerText = ''));
}
function closePopup() {
	isStopped = true;
	currentRunId++;
	hidePopup();
}
//Function to convert time in ms format to hhmmss format
function displayTime(ms) {
	const seconds = String(Math.floor(ms / 1000) % 60).padStart(2, 0);
	const minutes = String(Math.floor(ms / 60000) % 60).padStart(2, 0);
	const hours = Math.floor(ms / 3600000);
	return `${hours}:${minutes}:${seconds}`;
}
//Function to adjust text size of an output based on the length of the array
function adjustTextSize(array, outputEl) {
	if (array.length > 128) {
		outputEl.style.fontSize = '14px';
	}
	if (array.length > 512) {
		outputEl.style.fontSize = '12px';
	}
	if (array.length > 1024) {
		outputEl.style.fontSize = '10px';
	}
	if (array.length > 4096) {
		outputEl.style.fontSize = '8px';
	}
	if (array.length > 8192) {
		outputEl.style.fontSize = '6px';
	}
	if (array.length > 16384) {
		outputEl.style.fontSize = '5.5px';
	}
}
//Prime display functions
function showFactorsBtn() {
	factorsBtns.forEach((btn) => (btn.style.display = 'inline-block'));
	primeSection.querySelector('#factors-result').style.display = 'block';
	primeSection.querySelector('#factors-result').textContent = '';
}
function hideFactorsBtn() {
	factorsBtns.forEach((btn) => (btn.style.display = 'none'));
	primeSection.querySelector('#factors-result').style.display = 'none';
	primeSection.querySelector('#factors-result').textContent = '';
}
function clearPrime() {
	closePopup();
	primeInput.value = '';
	primeSection.querySelector('#prime-result').textContent = '';
	hideFactorsBtn();
}
function clearPrimeRange() {
	closePopup();
	primeSection.querySelector('#prime-range-start').value = '';
	primeSection.querySelector('#prime-range-end').value = '';
	primeSection.querySelector('#prime-range-result').textContent = '';
}
//Function to initialize event listeners
function init() {
	primeInput.addEventListener('input', hideFactorsBtn);
	primeSection
		.querySelector('#prime-btn')
		.addEventListener('click', isPrimeSingle);
	primeSection
		.querySelector('#check-factors-btn')
		.addEventListener('click', () => findFactors('short'));
	primeSection
		.querySelector('#check-all-factors-btn')
		.addEventListener('click', () => findFactors('long'));
	primeSection
		.querySelector('#prime-clear-btn')
		.addEventListener('click', clearPrime);
	primeSection
		.querySelector('#prime-range-btn')
		.addEventListener('click', isPrimeRange);
	primeSection
		.querySelector('#prime-range-clear-btn')
		.addEventListener('click', clearPrimeRange);
	document.querySelector('.popup-close').addEventListener('click', closePopup);
}

//Code which runs when page loads
document.addEventListener('DOMContentLoaded', init);
