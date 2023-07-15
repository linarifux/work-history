const mongoose = require('mongoose')

const worksSchema = new mongoose.Schema({
    items: [
        {
            title: {type: String, required: true},
            duration: {type: Number, required: true}
        }
    ],
    hours: {
        type: Number,
        required: true,
        default: 0
    },
    total: {
        type: Number,
        required: true,
        default: 0
    }
},
{timestamps: true}
)

const Works = mongoose.model('works', worksSchema)

module.exports = Works