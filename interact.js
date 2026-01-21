//shape background color and text change logic
//selecting elements
const body = document.querySelector('body');
const shape1 = document.querySelector('.square');
const shape2 = document.querySelector('.circle');
const leftButton = document.querySelector('#btn-left');
const rightButton = document.querySelector('#btn-right');
const swapButton = document.querySelector('#btn-swap');
const counter = document.querySelector('#counter');
//function to change shape
let changeShape = (shape) => {
    if (shape.className === 'square') {
        shape.className = 'circle';     
        shape.innerText = 'This is now a circle';
    }
    else if (shape.className === 'circle') {
        shape.className = 'square';
        shape.innerText = 'This is now a square';
    }
};
//binding functions to specific shapes
let changeRight = changeShape.bind(this, shape2);

let changeLeft = changeShape.bind(this, shape1);

let swap =  () => {
    changeLeft();
    changeRight();
}
//array of all shape buttons
let allShapeButtons = [swapButton, shape1, leftButton, shape2, rightButton];
//click event listeners
let count = 0;
//adding event listeners to all shape buttons
allShapeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button === shape1 || button === leftButton) {
            changeLeft();
        }
        else if (button === shape2 || button === rightButton) {
            changeRight();
        }
        else if (button === swapButton) {
            swap();
        }
        count++;
        counter.innerText = `Swapped ${count} times`;
    });
});

//page background color change logic
//adding event listeners to color divs and changing background color on click
document.querySelectorAll('.color-choose-wrapper > div').forEach(div => {
    div.addEventListener('click', () => {
        let selectedColor = getComputedStyle(div).backgroundColor;
        document.body.style.backgroundColor = selectedColor;
    });
});

//ad hide logic
const adWrapper = document.querySelector('.ad-wrapper');
const hideAdButton = document.querySelector('.hide-ad-button');

hideAdButton.addEventListener('click', () => {
    adWrapper.style.display = 'none';
});

setTimeout(() => {
    hideAdButton.style.display = 'block';
}, 7000);  
