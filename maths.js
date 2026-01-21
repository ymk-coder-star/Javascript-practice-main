const numberInput = document.querySelector('#num-input');
const calculateButton = document.querySelector('#calc-btn');
const clearButton = document.querySelector('#clear-btn');
const result1 = document.querySelector('#result1');
const result2 = document.querySelector('#result2');
const result3 = document.querySelector('#result3');

calculateButton.addEventListener('click', (event) => {
    let square = Number(numberInput.value)**2;
    result1.textContent = ` ${square.toLocaleString()} is the square of ${numberInput.value}`;

    let cube = Number(numberInput.value)**3;
    result2.textContent = ` ${cube.toLocaleString()} is the cube of ${numberInput.value}`;

    let sqrt = Math.sqrt(Number(numberInput.value)).toFixed(2) ;
    result3.textContent = ` ${sqrt} is the square root of ${numberInput.value}`;

    console.log(numberInput.value);
});

clearButton.addEventListener('click', (event) => {
    numberInput.value = '';
    result1.innerText = '';
    result2.innerText = '';
    result3.innerText = '';
});

// const miles = document.querySelector('#miles');
// const km = document.querySelector('#kilometers');

// miles.addEventListener('input', (event) => {
//     if (miles.value === '') {
//         km.value = '';
//     } else {
//         let kilometers = Number(miles.value) * 1.60934;
//         km.value = kilometers.toFixed(2);
//     }
// });

// km.addEventListener('input', (event) => {
//     if (km.value === '') {
//         miles.value = '';
//     } else {
//         let milesValue = Number(km.value) / 1.60934;
//         miles.value = milesValue.toFixed(2);
//     }
// });


// document.querySelectorAll('.conv-container').forEach(container => {
//     const select = container.querySelector('select');
//     function getSelectedUnit() {
//     let selectedUnit = select.value;

//     function updateSelectedUnit() {
//     if (selectedUnit === 'Mile') {
//         selectedUnit = 1609.34;
//         return selectedUnit;
//     }
//     else if (selectedUnit === 'Kilometer') {
//         selectedUnit = 1000;
//         return selectedUnit;
//     }}
//     updateSelectedUnit();

//     select.addEventListener('change', (event) => {
//         selectedUnit = event.target.value;
//         updateSelectedUnit();
//     });

//     return selectedUnit;
//     }
//     console.log(getSelectedUnit());

//     const input = container.querySelector('input');
//     input.addEventListener('input', (event) => {
//         let inputValue = event.target.value;
//         let outputValue = inputValue * getSelectedUnit();
//         console.log(outputValue);
//         cousin = container.closest('.conv-container').querySelectorAll('input');
//         console.log(cousin.value);
//     }); 

// });

// converter code
// const containers = document.querySelectorAll('.conv-container');
// if (containers.length >= 2) {
//     const container1 = containers[0];
//     const container2 = containers[1];
//     const select1 = container1.querySelector('select');
//     const input1 = container1.querySelector('input');
//     const select2 = container2.querySelector('select');
//     const input2 = container2.querySelector('input');

//     function getFactor(unit) {
//         if (unit === 'Mile') return 1609.344;
//         if (unit === 'Kilometre') return 1000;
//         if (unit === 'Metre') return 1;
//         if (unit === 'Centimetre') return 0.01;
//         if (unit === 'Millimetre') return 0.001;
//         if (unit === 'Yard') return 0.9144;
//         if (unit === 'Foot') return 0.3048;
//         if (unit === 'Inch') return 0.0254;
//         return 1;
//     }

//     function updateFrom1() {
//         const factor1 = getFactor(select1.value);
//         const factor2 = getFactor(select2.value);
//         const val1 = Number(input1.value);
//         if ((val1)=='') {
//             input2.value = '';
//         }
//         else {
//             input2.value = ((val1 * factor1) / factor2).toFixed(2);
//         }
//     }

//     function updateFrom2() {
//         const factor1 = getFactor(select1.value);
//         const factor2 = getFactor(select2.value);
//         const val2 = Number(input2.value);
//         if ((val2)=='') {
//             input1.value = '';
//         }
//         else {
//             input1.value = ((val2 * factor2) / factor1).toFixed(2);
//         }
//     }

//     input1.addEventListener('input', updateFrom1);
//     input2.addEventListener('input', updateFrom2);
//     select1.addEventListener('change', () => {
//         if (input1.value) updateFrom1();
//         input1.placeholder = `Enter ${select1.value.toLowerCase()}`;
//     });
//     select2.addEventListener('change', () => {
//         if (input2.value) updateFrom2();
//         input2.placeholder = `Enter ${select2.value.toLowerCase()}`;
//     });
// }

// New converter code
document.querySelectorAll('.converter-section').forEach(section => {
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
                'Mile': 1609.344,
                'Kilometre': 1000,
                'Metre': 1,
                'Centimetre': 0.01,
                'Millimetre': 0.001,
                'Yard': 0.9144,
                'Foot': 0.3048,
                'Inch': 0.0254
            };
            return factors[unit] || 1;
        }

        function getWeightFactor(unit) {
            const factors = {
                'Kilogram': 1000,
                'Gram': 1,
                'Milligram': 0.001,
                'Stone': 6350.29,
                'Pound': 453.592,
                'Ounce': 28.3495
            };
            return factors[unit] || 1;
        }

        function convertTemp(val, from, to) {
            // Convert to Celsius first
            let c;
            if (from === 'Celsius') c = val;
            else if (from === 'Fahrenheit') c = (val - 32) * 5 / 9;
            else if (from === 'Kelvin') c = val - 273.15;
            // Then to target
            if (to === 'Celsius') return c;
            else if (to === 'Fahrenheit') return (c * 9 / 5) + 32;
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
                input2.value = convertTemp(val1, select1.value, select2.value).toFixed(2);
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
                input1.value = convertTemp(val2, select2.value, select1.value).toFixed(2);
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

//page background color change logic
document.querySelectorAll('.color-choose-wrapper > div').forEach(div => {
    div.addEventListener('click', () => {
        let selectedColor = getComputedStyle(div).backgroundColor;
        document.body.style.backgroundColor = selectedColor;
    });
});