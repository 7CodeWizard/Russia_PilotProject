const factoryData = require("../models/factoryShowModel");

const createFactory = async (req, res) => {
    const data = {
        ...req.body,
        video: req.file ? req.file.filename : '',
    };


    try {
        const newFactory = new factoryData(data);
        await newFactory.save();
        return res.status(200).json({
            message: "Successfully saved!"
        });
    } catch (error) {
        console.error('Error saving data:', error);
        return res.status(400).json({ error: 'Error saving data' });
    }
}

const updateFactory = async (req, res) => {
    const factoryId = req.params.facid;

    try {
        const existingFactory = await factoryData.findById(factoryId);
        if (!existingFactory) {
            return res.status(404).json({ message: 'Factory not found' });
        }
        const updatedData = {
            ...req.body,
            video: req.file
                ? req.file.filename
                : existingFactory.video,
        };

        const updatedFactory = await factoryData.findByIdAndUpdate(factoryId, updatedData, { new: true });

        return res.status(200).json({
            message: 'Factory successfully updated!',
            updatedFactory,
        });

    } catch (error) {
        console.error('Error updating factory:', error);
        return res.status(400).json({ error: 'Error updating factory' });
    }
};


const getFactorys = async (req, res) => {
    try {
        const factory = await factoryData.find({}).sort({ queue: -1 });
        res.status(200).json(factory);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching data' });
    }
};

const getTopFactorys = async (req, res) => {
    try {
        const factory = await factoryData.find({})
            .sort({ queue: -1 })
            .limit(2);
        res.status(200).json(factory);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching factories' });
    }
};

const getFactoryById = async (req, res) => {
    try {
        const factory = await factoryData.findById(req.params.facid);
        if (factory) {
            res.status(200).json(factory);
        } else {
            res.status(404).json({ error: "factory not found" });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error fetching data' });
    }
};

const deleteFactory = async (req, res) => {
    try {
        let result = await factoryData.deleteOne({ _id: req.params.facid })
        let data = await factoryData.find()
        res.json(data)
    } catch (err) {
        return res.status(400).json({ error: err })
    }
}

module.exports = { createFactory, updateFactory, getFactorys, getFactoryById, deleteFactory, getTopFactorys };
