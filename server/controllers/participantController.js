const participantData = require("../models/participantModel");

const createParticipant = async (req, res) => {
  const data = {
    ...req.body,
    image: req.file ? req.file.filename : '', // Use req.files
  };


  try {
    const newParticipant = new participantData(data);
    await newParticipant.save();
    return res.status(200).json({
      message: "Successfully saved!"
    });
  } catch (error) {
    console.error('Error saving data:', error); // Log the error
    return res.status(400).json({ error: 'Error saving data' });
  }
}

const updateParticipant = async (req, res) => {
  const participantId = req.params.participantId;

  try {
    const existingParticipant = await participantData.findById(participantId);
    if (!existingParticipant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    const updatedData = {
      ...req.body,
      image: req.file ? req.file.filename : existingParticipant.image,
    };

    const updatedParticipant = await participantData.findByIdAndUpdate(participantId, updatedData, { new: true });

    return res.status(200).json({
      message: 'Participant successfully updated!',
      updatedParticipant,
    });

  } catch (error) {
    console.error('Error updating participant:', error);
    return res.status(400).json({ error: 'Error updating participant data' });
  }
};


const getParticipants = async (req, res) => {
  try {
    const factory = await participantData.find({});
    res.status(200).json(factory);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching data' });
  }
};

const getShowParticipants = async (req, res) => {
  const { participantNum } = req.query;
  try {
    const factory = await participantData.find().limit(participantNum);
    res.status(200).json(factory);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching data' });
  }
};

const getParticipantById = async (req, res) => {
  try {
    const participant = await participantData.findById(req.params.participantId);
    if (participant) {
      res.status(200).json(participant);
    } else {
      res.status(404).json({ error: "participant not found" });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error fetching data' });
  }
};

const deleteParticipant = async (req, res) => {
  try {
    let result = await participantData.deleteOne({ _id: req.params.participantId })
    let data = await participantData.find()
    res.json(data)
  } catch (err) {
    return res.status(400).json({ error: err })
  }
}

module.exports = { createParticipant, updateParticipant, getParticipants, getParticipantById, deleteParticipant, getShowParticipants };
