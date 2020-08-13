const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const monthsInput = document.getElementById('monthsInput');
const yearsInput = document.getElementById('yearsInput');
const calcBtn = document.getElementById('submit');
const headingForm = document.querySelector('.form__heading');
const form = document.querySelector('.form');
const dayOutput = document.getElementById('dayOutput');
const monthOutput = document.getElementById('monthOutput');
const yearOutput = document.getElementById('yearOutput');
const total = document.getElementById('total');

const todayDay = new Date().getDate();
const todayMonth_1 = new Date().getMonth() + 1;
const todayYear = new Date().getFullYear();
const todayMonth = new Date().getMonth();
const daysInMonth = new Date(todayYear, todayMonth, 0).getDate();
let newDays = 0;
const differDays = daysInMonth - todayDay;
const loading = document.querySelector('.loading');
const result = document.querySelector('.form__footer');
// EVENTS



// document.addEventListener('DOMContentLoaded', function () {
//     getInfoFromLocal();
// });
calcBtn.addEventListener('click', function () {

    result.style.display = 'none';
    loading.style.display = 'flex';

    setTimeout(calculateValues, 2000)
}); //calc values


function calculateValues() {
    if (amount.value < 0 ||
        interest.value < 0 ||
        monthsInput.value < 0 ||
        yearsInput.value < 0) {
        showError('Please check your numbers');
        clearValues();
        return;
    }

    let tempObj = {
        amount: amount.value,
        interest: interest.value,
        monthsInput: monthsInput.value,
        yearsInput: yearsInput.value
    }
    StoreToLocalStorage(tempObj);
    getInfoFromLocal();
    const alldays = todayYear % 4 === 0 ? 366 : 365;
    const forOneDay = (parseFloat(amount.value) / 100 * parseFloat(interest.value)) / alldays;


    for (let i = todayMonth + 2; i <= parseFloat(monthsInput.value); i++) {
        newDays = newDays + new Date(todayYear, i, 0).getDate();
    }

    const totalBase = forOneDay * (parseFloat(yearsInput.value) * alldays + newDays + differDays);

    const forOneMonth = forOneDay * daysInMonth;
    const forOneYear = forOneDay * alldays;

    if (totalBase) {
        dayOutput.value = forOneDay.toFixed(2);
        monthOutput.value = forOneMonth.toFixed(2);
        yearOutput.value = forOneYear.toFixed(2);
        total.value = totalBase.toFixed(2);

        loading.style.display = 'none';
        result.style.display = 'block';
    } else {
        showError('Please check your numbers');
    }
    clearValues();
}

function showError(error) {
    loading.style.display = 'none';
    result.style.display = 'none';
    const div = document.createElement('div');
    div.className = 'error';
    div.innerText = error;
    // insertBefor
    form.insertBefore(div, headingForm);
    // clear error
    setTimeout(clearError, 2000);
}

function clearError() {
    document.querySelector('.error').remove();

}

function clearValues() {
    amount.value = "";
    interest.value = "";
    monthsInput.value = "";
    yearsInput.value = "";
}

function StoreToLocalStorage(inputs) {
    localStorage.setItem('inputs', JSON.stringify(inputs));
}

function getInfoFromLocal() {

    let prev = document.querySelector('.info');
    if (prev !== null) {
        prev.remove();
    }
    // prev.remove();
    let div = document.createElement('div');
    div.className = "info";
    inputs = JSON.parse(localStorage.getItem('inputs'));
    div.innerHTML =
        `
    <h1> Last Input </h1>
    <div class="info__wrap">
        <div class="info__item">Money: ${inputs.amount}</div>
        <div class="info__item">Interest: ${inputs.interest}</div>
        <div class="info__item">Months: ${inputs.monthsInput}</div>
        <div class="info__item">Years: ${inputs.yearsInput}</div>
    </div>
    `
    insertAfter(form, div);
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}