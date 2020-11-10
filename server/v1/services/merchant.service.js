import HttpStatus from "http-status-codes";
import { v4 as uuidv4 } from "uuid";

import MerchantQuery from "server/v1/db/merchant.query";

const createMerchant = async (countryCode, merchantName, userId) => {
  let payload = {};
  const id = uuidv4();

  const addedMerchant = await MerchantQuery.createMerchant({
    id,
    country_code: countryCode,
    merchant_name: merchantName,
    user_id: userId,
    status: true,
  });
  payload.status = HttpStatus.CREATED;
  payload.result = addedMerchant && addedMerchant[0];

  return payload;
};

export default {
  createMerchant,
};
