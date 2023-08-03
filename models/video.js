const mongoose = require('mongoose');

const videoSchema= mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        pathVideo: String,
        elementId:  { type: mongoose.Schema.Types.ObjectId, ref: 'elementSchema' }
    }
);