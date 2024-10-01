const caseData = require('../models/caseModel')
const siteData = require('../models/siteModel')
const equipmentData = require('../models/equipModel')
const d_threeData = require('../models/threeDModel')

const getCases = async (req, res) => {
    try {
        let data = await caseData.find().sort({ queue: -1 })
        res.json(data)
    } catch {
        res.status('400').json({ error: 'error fetching data' })
    }
}

const insertCase = async (req, res) => {
    const data = {
        ...req.body,
        video: req.files['video'] ? req.files['video'][0].filename : '', // Use req.files
        images: req.files['images'] ? req.files['images'].map(file => file.filename) : [],
        d_id: req.body.d_id && req.body.d_id.trim() !== '' ? req.body.d_id : null,
        equipment: req.body.equipment && req.body.equipment[0].trim() !== '' ? req.body.equipment : null,
        site: req.body.site && req.body.site.trim() !== '' ? req.body.site : null,
    };

    try {
        const newCase = new caseData(data);
        await newCase.save();

        if (req.body.site) {
            await siteData.findByIdAndUpdate(
                req.body.site,
                { $push: { cases: newCase._id } },
                { new: true }
            );
        }
        if (req.body.d_id) {
            await d_threeData.findByIdAndUpdate(
                req.body.d_id,
                { $push: { cases: newCase._id } },
                { new: true }
            );
        }

        if (req.body.equipment && req.body.equipment.length > 0) {
            await Promise.all(req.body.equipment.map(async (item) => {
                await equipmentData.findByIdAndUpdate(
                    item,
                    { $push: { cases: newCase._id } },
                    { new: true }
                );
            }));
        }

        return res.status(200).json({
            message: "Successfully saved!"
        });

    } catch (error) {
        console.error('Error saving data:', error); // Log the error
        return res.status(400).json({ error: 'Error saving data' });
    }
}

const updateCase = async (req, res) => {
    const caseId = req.params.caseid;
    try {
        const existingCase = await caseData.findById(caseId);
        if (!existingCase) {
            return res.status(404).json({ message: 'Case not found' });
        }
        const updatedData = {
            ...req.body,
            video: req.files && req.files['video'] ? req.files['video'][0].filename : existingCase.video,
            images: req.files && req.files['images'] ? req.files['images'].map(file => file.filename) : existingCase.images,
            d_id: req.body.d_id && req.body.d_id.trim() !== '' ? req.body.d_id : existingCase.d_id,
            equipment: req.body.equipment && req.body.equipment.length > 0 ? req.body.equipment : existingCase.equipment,
            site: req.body.site && req.body.site.trim() !== '' ? req.body.site : existingCase.site,
        };

        const updatedCase = await caseData.findByIdAndUpdate(caseId, updatedData, { new: true });

        if (req.body.site && req.body.site !== existingCase.site) {
            if (existingCase.site) {
                await siteData.findByIdAndUpdate(existingCase.site, { $pull: { cases: caseId } });
            }
            await siteData.findByIdAndUpdate(req.body.site, { $push: { cases: caseId } });
        }

        if (req.body.d_id && req.body.d_id !== existingCase.d_id) {
            if (existingCase.d_id) {
                await d_threeData.findByIdAndUpdate(existingCase.d_id, { $pull: { cases: caseId } });
            }
            await d_threeData.findByIdAndUpdate(req.body.d_id, { $push: { cases: caseId } });
        }

        if (req.body.equipment) {
            if (existingCase.equipment && existingCase.equipment.length > 0) {
                await Promise.all(existingCase.equipment.map(async (item) => {
                    await equipmentData.findByIdAndUpdate(item, { $pull: { cases: caseId } });
                }));
            }

            await Promise.all(req.body.equipment.map(async (item) => {
                await equipmentData.findByIdAndUpdate(item, { $push: { cases: caseId } });
            }));
        }

        return res.status(200).json({
            message: 'Case successfully updated!',
            updatedCase,
        });

    } catch (error) {
        console.error('Error updating data:', error); // Log the error
        return res.status(400).json({ error: 'Error updating case data' });
    }
};


const deleteCase = async (req, res) => {
    try {
        const caseToDelete = await caseData.findById(req.params.caseid);

        if (!caseToDelete) {
            return res.status(404).json({ error: "Case not found" });
        }

        await caseData.deleteOne({ _id: req.params.caseid });

        if (caseToDelete.site) {
            await siteData.findByIdAndUpdate(
                caseToDelete.site,
                { $pull: { cases: caseToDelete._id } },
                { new: true }
            );
        }

        if (caseToDelete.equipment && caseToDelete.equipment.length > 0) {
            await Promise.all(
                caseToDelete.equipment.map(async (equipmentId) => {
                    await equipmentData.findByIdAndUpdate(
                        equipmentId,
                        { $pull: { cases: caseToDelete._id } },
                        { new: true }
                    );
                })
            );
        }

        const remainingCases = await caseData.find();
        return res.json(remainingCases);

    } catch (err) {
        console.error('Error deleting case:', err);
        return res.status(400).json({ error: 'Error deleting case' });
    }
};


const getCaseByID = async (req, res) => {
    try {
        const result = await caseData.findById(req.params.caseid).populate('site').populate('equipment').populate('d_id');
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "Publication not found" });
        }
    } catch (error) {
        res.status(400).json({ error: 'error fetching data' })
    }
};

const insertSolution = async (req, res) => {

    const images = req.files['images'] ? req.files['images'].map((file, index) => {
        return {
            image: file.filename,
            title: req.body.imageContent[index],
        };
    }) : [];
    const data = {
        content: req.body.content,
        images,
        idd: req.body.idd
    };
    try {
        await caseData.findByIdAndUpdate(
            req.body.idd,
            { $push: { solution: data } },
            { new: true }
        );
        return res.status(200).json({
            message: "Successfully saved!"
        });
    } catch (error) {
        console.error('Error saving data:', error);
        return res.status(400).json({ error: 'Error saving data' });
    }
}

const getCasesWithCheckbox = async (req, res) => {
    const { checkboxValue, casesNum } = req.query;
    if (!checkboxValue) {
        return res.status(400).json({ error: 'Checkbox value is required' });
    }

    try {
        const cases = await caseData.find({ checkbox: checkboxValue }).select('video name venue').sort({ queue: -1 }).limit(casesNum);
        res.json(cases);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

const getCaseByType = async (req, res) => {
    const { caseType } = req.query;
    try {
        let data = await caseData.find({ type: caseType }).select('video name venue').limit(1)
        res.status(200).json(data);
    } catch {
        res.status('400').json({ error: 'error fetching data' })
    }
}

module.exports = { getCases, insertCase, updateCase, deleteCase, getCaseByID, insertSolution, getCasesWithCheckbox, getCaseByType }