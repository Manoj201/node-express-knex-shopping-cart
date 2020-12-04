"use strict";
import HttpStatus from "http-status-codes";

import assetService from "server/v1/services/asset.service";

const assetController = {
  getAvatar: async (req, res, next) => {
    try {
      const { id } = req.params;
      // fetching AWS keys, this should be move to env file security reason of git hub im sending as headers
      const { accesskeyid: accessKeyId, secretaccesskey: secretAccessKey } = req.headers;
      const s3Params = {
        accessKeyId, secretAccessKey,
      };
      const data = await assetService.getAvatar(id, s3Params);
      res.writeHead(HttpStatus.OK, { "Content-Type": "image/jpeg" });
      res.write(data.Body, "binary");
      res.end(null, "binary");
    } catch (error) {
      next(error);
    }
  },
};

export default assetController;
