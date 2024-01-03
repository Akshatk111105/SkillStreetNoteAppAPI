const mongoose = require("mongoose")
const user = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        maxlength: 10,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        unique: true,
        required: true,
    },
    list: [
    {
        type: mongoose.Types.ObjectId,
        ref: "List",
    },
],
},
{timestamps: true},
);

module.exports = mongoose.model("User", user);