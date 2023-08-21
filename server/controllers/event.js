import Event from '../models/Events.js';

// const FormDataModel = require('../models/Events');

export const submitFormData = async (req, res) => {
    const {
        eventName,
        startDateTime,
        // startTiming,
        locationType,
        details} = req.body;

    try {
        const newFormData = new Event({
            eventName,
            startDateTime,
            // startTiming,
            locationType,
            details});
        await newFormData.save();
        res.status(201).json(newFormData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// module.exports = {
//     submitFormData,
// };
