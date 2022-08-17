const email = document.getElementById('email');
const nameInput = document.getElementById('name');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const btnIcons = document.querySelectorAll('.form__password-show-password');
const success = document.querySelector('.success')
const alertEmail = document.querySelector('.form__alert-mail');
const alertName = document.querySelector('.form__alert-name');
const alertPhone = document.querySelector('.form__alert-phone');
const alertPassword = document.querySelector('.form__alert-password');
const alertCheckbox = document.querySelector('.form__checkbox-alert');
const checkbox = document.querySelector('.form__checkbox');

const form = document.querySelector('.form');
const validationForm = {
    validEmail: false,
    validName: false,
    validPhone: false,
    validPassword: false,
    validCheckbox: false,
}

btnIcons.forEach(btnIcon => {
    const btnShow = document.querySelector('[data-name="visibility"]')
    const btnHide = document.querySelector('[data-name="hidden"]')
    btnIcon.addEventListener('click', () => {
        if (btnHide.classList.contains('hide')) {
            btnHide.classList.remove('hide')
            btnShow.classList.add('hide')
            password.type = 'text'
        } else if (btnShow.classList.contains('hide')) {
            btnShow.classList.remove('hide')
            btnHide.classList.add('hide')
            password.type = 'password'
        }
    })
})

function generateAlert(alert, input) {
    const stylingOutline = '1px solid #b80000'
    alert.classList.remove('hide');
    input.style.outline = stylingOutline;
}

function successAlert(alert, input) {
    const stylingOutline = '1px solid #14a114';
    alert.classList.add('hide');
    input.style.outline = stylingOutline;
}

email.addEventListener('focusout', () => {
    const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.value === '' || !email.value.match(mailFormat)) {
        generateAlert(alertEmail, email)
        validationForm.validEmail = false
    } else {
        successAlert(alertEmail, email)
        validationForm.validEmail = true
    }
})

nameInput.addEventListener('focusout', () => {
    if (nameInput.value === '' || nameInput.value.length < 5) {
        generateAlert(alertName, nameInput)
        validationForm.validName = false
    } else {
        successAlert(alertName, nameInput)
        validationForm.validName = true
    }
})

phone.addEventListener('focusout', () => {
    const digits = /^[0-9]+$/
    phone.value = parseInt(phone.value)
    if (phone.value === '' || !phone.value.match(digits)) {
        generateAlert(alertPhone, phone)
        phone.value = ''
        validationForm.validPhone = false
    } else {
        successAlert(alertPhone, phone)
        validationForm.validPhone = true
    }
})

password.addEventListener('focusout', () => {
    const pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/;
    if (!password.value.match(pass)) {
        generateAlert(alertPassword, password)
        validationForm.validPassword = false
    } else {
        successAlert(alertPassword, password)
        validationForm.validPassword = true
    }
})

checkbox.addEventListener('input', () => {
    if (checkbox.checked) validationForm.validCheckbox = true
    else if (!checkbox.checked) validationForm.validCheckbox = false
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (validationForm.validEmail &&
        validationForm.validName &&
        validationForm.validPhone &&
        validationForm.validPassword &&
        validationForm.validCheckbox) {
        location.href = form.getAttribute('action')
        alertCheckbox.classList.add('hide')
        email.value = '';
        nameInput.value = '';
        phone.value = '';
        password.value = '';
        checkbox.checked = false;
    }
    if (!validationForm.validEmail) generateAlert(alertEmail, email)
    if (!validationForm.validName) generateAlert(alertName, nameInput)
    if (!validationForm.validPhone) generateAlert(alertPhone, phone)
    if (!validationForm.validPassword) generateAlert(alertPassword, password)
    if (!validationForm.validCheckbox) alertCheckbox.classList.remove('hide')
    else if (validationForm.validCheckbox) alertCheckbox.classList.add('hide')
})