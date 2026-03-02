const identifyService = require("../services/identify.service");

exports.identifyContact = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    const result = await identifyService.handleIdentify(email, phoneNumber);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
