const mongoose = require('mongoose');

const userSchema= mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        email: String,
        password:String
    }
);

//Product= le anarana iantsoana anle model refa ampiasa anazy ao amle projet
// module.exports = mongoose.model('User',userSchema);