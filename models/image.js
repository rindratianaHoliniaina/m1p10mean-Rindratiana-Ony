const mongoose = require('mongoose');

const imageSchema= mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        pathImage: String,
        elementId: { type: mongoose.Schema.Types.ObjectId, ref: 'elementSchema' }
    }
);