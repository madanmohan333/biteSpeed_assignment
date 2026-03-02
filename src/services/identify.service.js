const prisma = require("../config/prisma");

exports.handleIdentify = async (email, phoneNumber) => {
  // We will implement logic next
  return {
    contact: {
      primaryContatctId: null,
      emails: [],
      phoneNumbers: [],
      secondaryContactIds: []
    }
  };
};