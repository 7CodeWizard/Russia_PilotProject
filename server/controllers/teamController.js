const teamData = require("../models/teamModel");

const createOrUpdateTeam = async (req, res) => {
  const data = {
    ...req.body,
  };

  try {
    const existingTeam = await teamData.findOne();

    if (existingTeam) {
      await teamData.updateOne({ _id: existingTeam._id }, data);
      return res.status(200).json({
        message: "Team data successfully updated!",
      });
    } else {
      const newRental = new teamData(data);
      await newRental.save();
      return res.status(200).json({
        message: "Team data successfully saved!",
      });
    }
  } catch (error) {
    console.error("Error saving or updating team data:", error);
    return res.status(400).json({ error: "Error saving or updating team data" });
  }
};

const getTeam = async (req, res) => {
  try {
    let factory = await teamData.find();
    res.status(200).json(factory);
  } catch {
    res.status('400').json({ error: 'error fetching data' })
  }
};

module.exports = { getTeam, createOrUpdateTeam };
