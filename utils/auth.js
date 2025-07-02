import { baseUrl } from "./shared";

const step1LoginFormError = document.querySelector(".step-1-login-form__error");
const phoneNumberInput = document.querySelector(".phone_Number_input");

const submitNumber = async () => {
  const phoneRegex = RegExp(/^(09)[0-9]{9}$/);
  const phoneNumber = phoneNumberInput.value;
  const isValidPhoneNumber = phoneRegex.test(phoneNumber);

  console.log("Is Valid Phone ->", isValidPhoneNumber);

  if (isValidPhoneNumber) {
    // codes
  } else {
    // codes
  }
};

export { submitNumber };
