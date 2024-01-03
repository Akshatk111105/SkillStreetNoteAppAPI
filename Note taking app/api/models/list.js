const mongoose = require("mongoose")
const listSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 15,
        required: true,
    },
    body: {
        type: String,
        maxlength: 200,
        required: true,
    },
    user: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    ], 
},
{timestamps: true},
);

module.exports = mongoose.model("List", listSchema);