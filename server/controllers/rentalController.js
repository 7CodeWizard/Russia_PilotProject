const rentalData = require("../models/rentalModel");

const createOrUpdateRental = async (req, res) => {
  const data = {
    ...req.body,
    files: req.files['files'] ? req.files['files'].map(file => file.filename) : [],
  };

  try {
    const existingRental = await rentalData.findOne();

    if (existingRental) {
      await rentalData.updateOne({ _id: existingRental._id }, data);
      return res.status(200).json({
        message: "Rental data successfully updated!",
      });
    } else {
      const newRental = new rentalData(data);
      await newRental.save();
      return res.status(200).json({
        message: "Rental data successfully saved!",
      });
    }
  } catch (error) {
    console.error("Error saving or updating rental data:", error);
    return res.status(400).json({ error: "Error saving or updating rental data" });
  }
};

const getRental = async (req, res) => {
  try {
    const rental = await rentalData.findOne();
    res.status(200).json(rental);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching data' });
  }
};

module.exports = { getRental, createOrUpdateRental };
