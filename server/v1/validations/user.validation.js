import HttpStatus from "http-status-codes";

const createUserValidation = (payload) => {
  const validation = {
    details: {},
    valid: true,
  };
  const { userName, email, password } = payload;

  if (!userName) {
    validation.details["userName"] = "Username is required";
    validation.valid = false;
  }
  if (!email) {
    validation.details["email"] = "Email is required";
    validation.valid = false;
  }
  if (!password) {
    validation.details["password"] = "Password is required";
    validation.valid = false;
  }

  if (!validation.valid) {
    validation.message = "Please check the require fields";
    validation.status = HttpStatus.BAD_REQUEST;
  }

  return validation;
};

export default {
  createUserValidation,
};
