const mongoose = require('mongoose');

const provinceSchema= mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        nomProvince: String
    }
);

const Prov =  mongoose.model('Province',provinceSchema);
module.exports = Prov ;