const siteData = require('../models/siteModel')
const caseData = require('../models/caseModel')

const getSites = async (req, res) => {
    try {
        let data = await siteData.find().sort({ queue: -1 })
        res.json(data)
    } catch {
        res.status('400').json({ error: 'error fetching data' })
    }
}

const getsixSites = async (req, res) => {
    try {
        let data = await siteData.find().sort({ queue: -1 }).limit(6).select('video name type capacity address link_page'); // Limit to 6 items
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching data' });
    }
};

const insertSite = async (req, res) => {
    const data = {
        ...req.body,
        video: req.files['video'] ? req.files['video'][0].filename : '', // Use req.files
    };

    try {
        const newSite = new siteData(data);
        await newSite.save();
        return res.status(200).json({
            message: "Successfully saved!"
        });
    } catch (error) {
        console.error('Error saving data:', error); // Log the error
        return res.status(400).json({ error: 'Error saving data' });
    }
}

const updateSite = async (req, res) => {
    const siteId = req.params.siteid;

    try {
        const existingSite = await siteData.findById(siteId);
        if (!existingSite) {
            return res.status(404).json({ message: 'Site not found' });
        }

        const updatedData = {
            ...req.body,
            video: req.files && req.files['video']
                ? req.files['video'][0].filename
                : existingSite.video,
        };

        const updatedSite = await siteData.findByIdAndUpdate(siteId, updatedData, { new: true });

        return res.status(200).json({
            message: 'Site successfully updated!',
            updatedSite,
        });

    } catch (error) {
        console.error('Error updating site:', error);
        return res.status(400).json({ error: 'Error updating site' });
    }
};


const deleteSite = async (req, res) => {
    try {
        const siteToDelete = await siteData.findById(req.params.siteid);

        if (!siteToDelete) {
            return res.status(404).json({ error: "Site not found" });
        }

        await siteData.deleteOne({ _id: req.params.siteid });

        await caseData.updateMany(
            { site: req.params.siteid },
            { $unset: { site: "" } },
            { new: true }
        );

        let remainingSites = await siteData.find();

        res.json(remainingSites);

    } catch (err) {
        console.error('Error deleting site:', err);
        return res.status(400).json({ error: 'Error deleting site' });
    }
};


const getSiteByID = async (req, res) => {
    const result = await siteData.findById(req.params.siteid).populate('cases');
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).json({ error: "Publication not found" });
    }
};

module.exports = { getSites, insertSite, updateSite, deleteSite, getSiteByID, getsixSites }