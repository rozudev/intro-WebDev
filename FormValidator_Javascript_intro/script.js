const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  const isRequiredValid = checkRequired([username, email, password, confirmPassword]);

  let isFormValid = isRequiredValid;

  if (isRequiredValid) {
    const isUsernameValid = checklength(username, 3, 15);
    const isEmailValid = checkEmail(email);
    const isPasswordValid = checklength(password, 6, 25);
    const isConfirmPasswordValid = checkPasswordsMatch(password, confirmPassword);

    isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
  }
});

function checkEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.value)) {
        showError(input, `${getFieldName(input)} must be a valid email address`);
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}


function checklength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
        return false;
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function checkRequired(inputArr) {
    let isValid = true;

    inputArr.forEach(input => {
        if(input.value.trim() === "") {
            showError(input, `${getFieldName(input)} is required`);
            isValid = false;
        } else {
            showSuccess(input);
        }
    })

    return isValid;
}

function formatFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = "form-group error";
    const small = formGroup.querySelector("small");
    small.innerText = message;
}

function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.className = "form-group success";
}
