const phoneNumberService = require("../services/phoneNumber.service");

module.exports = {
  reformat: async (req, res) => {
    try {
      const phoneNumberResponse = await phoneNumberService.reformat(req);
      return res.status(phoneNumberResponse.code).json(phoneNumberResponse);
    } catch (err) {
      return res.status(err.code).json(err);
    }
  },
};
