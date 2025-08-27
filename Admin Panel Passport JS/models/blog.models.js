const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String
        },
        authname: {
            type: String
        },
        authorid: {
            type: String
        },
        description: {
            type: String
        },
        blogImg: {
            type: String
        },
        category: {
            type: String
        },
        authImg: {
            type: String
        }
    },
    {
        timestamps: true 
    }
);

module.exports = mongoose.model("blog", blogSchema);
