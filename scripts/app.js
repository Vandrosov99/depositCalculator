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
const newDays = 0;
const differDays = daysInMonth - todayDay;


// EVENTS
calcBtn.addEventListener('click', calculateValues); //calc values


function calculateValues() {

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
    } else {
        showError('Please check your numbers');
    }

}

function showError(error) {
    const div = document.createElement('div');
    div.className = 'error';
    div.innerText = error;
    // insertBefor
    form.insertBefore(div, headingForm);
    // clear error
    setTimeout(clearError, 1500);
}

function clearError() {
    document.querySelector('.error').remove();
}