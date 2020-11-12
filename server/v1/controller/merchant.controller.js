import HttpStatus from "http-status-codes";

import merchantValidation from "server/v1/validations/merchant.validations";
import merchantService from "server/v1/services/merchant.service";
import errorFactory from "server/util/errorFactory";

const merchantController = {
  createMerchant: async (req, res, next) => {
    try {
      const validation = merchantValidation.createMerchantValidation(req.body);

      if (validation.valid) {
        const { countryCode, merchantName, userId } = req.body;
        const data = await merchantService.createMerchant(
          countryCode,
          merchantName,
          userId
        );

        data.status === HttpStatus.CREATED ?
          res.status(HttpStatus.CREATED).json(data.result) :
          next(errorFactory.conflict(req.traceId));
      } else {
        next(validation);
      }
    } catch (error) {
      next(error);
    }
  },
};

export default merchantController;
