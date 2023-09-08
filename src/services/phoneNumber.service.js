const { StatusCodes: status } = require("http-status-codes");
const {
  apiResponse,
  apiBadRequestResponse,
} = require("../utils/apiResponse.util");

module.exports = {
  reformat: async (req) => {
    try {
      const phoneNumber = req.query.number;

      if (!phoneNumber) {
        return apiBadRequestResponse("Invalid phone number");
      }

      const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

      return apiResponse(
        status.OK,
        "OK",
        "Phone number formated successfully.",
        {
          formattedPhoneNumber,
        }
      );
    } catch (error) {
      console.error(error);
      return apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message
      );
    }
  },
};

function formatPhoneNumber(phoneNumber) {
  const cleanedNumber = phoneNumber.replace(/\D/g, "");

  if (cleanedNumber.startsWith("0")) {
    return `62${cleanedNumber.slice(1)}`;
  } else if (cleanedNumber.startsWith("6")) {
    return cleanedNumber;
  } else if (cleanedNumber.startsWith("+")) {
    return `62${cleanedNumber.slice(3)}`;
  } else {
    return cleanedNumber;
  }
}
