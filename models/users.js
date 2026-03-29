const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        login: {
            // поміняв назву схеми на login бо був конфлікт назв і була помилка
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
