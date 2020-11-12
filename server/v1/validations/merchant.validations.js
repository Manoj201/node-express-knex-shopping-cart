const createMerchantValidation = (payload) => {
  const validation = {
    details: {},
    valid: true,
  };
  const { merchantName, userId } = payload;

  if (!merchantName) {
    validation.details["merchantName"] = "Merchant name is required";
    validation.valid = false;
  }
  if (!userId) {
    validation.details["userId"] = "User Id is required";
    validation.valid = false;
  }

  return validation;
};

export default {
  createMerchantValidation,
};
