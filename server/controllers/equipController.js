const equipData = require('../models/equipModel')
const caseData = require('../models/caseModel')

const getEquipments = async (req, res) => {
    try {
        let data = await equipData.find().sort({ queue: -1 })
        res.json(data)
    } catch {
        res.status('400').json({ error: 'error fetching data' })
    }
}

const getEquipmentsByType = async (req, res) => {
    const { equipmentType } = req.query;
    try {
        let data = await equipData.find({ type: equipmentType }).sort({ queue: -1 }).select('images name description').limit(3); // Filter by 'type'
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching data' });
    }
};

const insertEquipment = async (req, res) => {

    const data = {
        ...req.body,
        images: req.files['images'] ? req.files['images'].map(file => file.filename) : [],
        file: req.files['files'] ? req.files['files'][0].filename : '',
        dimension: req.body.dimension ? JSON.parse(req.body.dimension) : null,
    };


    try {
        const newEquipment = new equipData(data);
        await newEquipment.save();
        return res.status(200).json({
            message: "Successfully saved!"
        });
    } catch (error) {
        console.error('Error saving data:', error); // Log the error
        return res.status(400).json({ error: 'Error saving data' });
    }
}

const updateEquipment = async (req, res) => {
    const equipmentId = req.params.equipid;

    try {
        const existingEquipment = await equipData.findById(equipmentId);
        if (!existingEquipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }

        const updatedData = {
            ...req.body,
            images: req.files && req.files['images']
                ? req.files['images'].map(file => file.filename)
                : existingEquipment.images,
            file: req.files && req.files['files']
                ? req.files['files'][0].filename
                : existingEquipment.file,
            dimension: req.body.dimension
                ? JSON.parse(req.body.dimension)
                : existingEquipment.dimension,
        };

        const updatedEquipment = await equipData.findByIdAndUpdate(equipmentId, updatedData, { new: true });

        return res.status(200).json({
            message: 'Equipment successfully updated!',
            updatedEquipment,
        });

    } catch (error) {
        console.error('Error updating equipment:', error); // Log the error
        return res.status(400).json({ error: 'Error updating equipment' });
    }
};


const deleteEquipment = async (req, res) => {
    try {
        const equipmentToDelete = await equipData.findById(req.params.equipid);

        if (!equipmentToDelete) {
            return res.status(404).json({ error: "Equipment not found" });
        }

        await equipData.deleteOne({ _id: req.params.equipid });

        await caseData.updateMany(
            { equipment: req.params.equipid },
            { $pull: { equipment: req.params.equipid } },
            { new: true }
        );

        let remainingEquipment = await equipData.find();

        res.json(remainingEquipment);

    } catch (err) {
        console.error('Error deleting equipment:', err);
        return res.status(400).json({ error: 'Error deleting equipment' });
    }
};

const getEquipmentByID = async (req, res) => {
    try {
        const result = await equipData.findById(req.params.equipid).populate('cases');
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "Publication not found" });
        }
    } catch (error) {
        res.status(400).json({ error: 'error fetching data' })
    }
};

module.exports = { getEquipments, updateEquipment, insertEquipment, deleteEquipment, getEquipmentByID, getEquipmentsByType }