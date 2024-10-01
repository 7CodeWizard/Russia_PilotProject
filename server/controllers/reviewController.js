const Review = require("../models/reviewModel");

const createReview = async (req, res) => {
    const data = {
        ...req.body,
        file: req.file ? req.file.filename : '', // Use req.files
    };


    try {
        const newReview = new Review(data);
        await newReview.save();
        return res.status(200).json({
            message: "Successfully saved!"
        });
    } catch (error) {
        console.error('Error saving data:', error); // Log the error
        return res.status(400).json({ error: 'Error saving data' });
    }
}

const updateReview = async (req, res) => {
    const reviewId = req.params.cusid;

    try {
        const existingReview = await Review.findById(reviewId);
        if (!existingReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        const updatedData = {
            ...req.body,
            file: req.file ? req.file.filename : existingReview.file,
        };

        const updatedReview = await Review.findByIdAndUpdate(reviewId, updatedData, { new: true });

        return res.status(200).json({
            message: 'Review successfully updated!',
            updatedReview,
        });

    } catch (error) {
        console.error('Error updating review:', error);
        return res.status(400).json({ error: 'Error updating review data' });
    }
};


const getReviews = async (req, res) => {
    const review = await Review.find({}).sort({ queue: -1 });
    res.status(200).json(review);
};

const getReviewsBytype = async (req, res) => {
    const { reviewType } = req.query;
    const review = await Review.find({ displayType: reviewType }).sort({ queue: -1 });
    res.status(200).json(review);
};

const getReviewByID = async (req, res) => {
    const review = await Review.findById(req.params.cusid);
    if (review) {
        res.status(200).json(review);
    } else {
        res.status(404).json({ error: "review not found" });
    }
};

const deleteReview = async (req, res) => {
    try {
        let result = await Review.deleteOne({ _id: req.params.cusid })
        let data = await Review.find()
        res.json(data)
    } catch (err) {
        return res.status(400).json({ error: err })
    }
}

module.exports = { createReview, updateReview, getReviews, getReviewByID, deleteReview, getReviewsBytype };
