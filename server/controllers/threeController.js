const threeData = require('../models/threeDModel')

const getThrees = async (req, res) => {
    try {
        let data = await threeData.find()
        res.json(data)
    } catch {
        res.status('400').json({ error: 'error fetching data' })
    }
}

const insertThree = async (req, res) => {
    const data = {
        ...req.body,
        video: req.file ? req.file.filename : '',
    };


    try {
        const newSite = new threeData(data);
        await newSite.save();
        return res.status(200).json({
            message: "Successfully saved!"
        });
    } catch (error) {
        console.error('Error saving data:', error);
        return res.status(400).json({ error: 'Error saving data' });
    }
}

const updateThree = async (req, res) => {
    const threeId = req.params.threeid;

    try {
        const existingThree = await threeData.findById(threeId);
        if (!existingThree) {
            return res.status(404).json({ message: 'Record not found' });
        }
        const updatedData = {
            ...req.body,
            video: req.file ? req.file.filename : existingThree.video,
        };

        const updatedThree = await threeData.findByIdAndUpdate(threeId, updatedData, { new: true });

        return res.status(200).json({
            message: 'Record successfully updated!',
            updatedThree,
        });

    } catch (error) {
        console.error('Error updating data:', error);
        return res.status(400).json({ error: 'Error updating data' });
    }
};



const deleteThree = async (req, res) => {
    try {
        let result = await threeData.deleteOne({ _id: req.params.threeid })
        let data = await threeData.find()
        res.json(data)
    } catch (err) {
        return res.status(400).json({ error: err })
    }
}

const getThreeByID = async (req, res) => {
    try {
        const result = await threeData.findById(req.params.threeid);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "Publication not found" });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error fetching data' });
    }
};

module.exports = { getThrees, insertThree, updateThree, deleteThree, getThreeByID }