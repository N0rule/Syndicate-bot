const {Schema, model, models} = require("mongoose")

const messageCountSchema = new Schema ({
    _id: {
    // Discord user id
        type: String,
        required: true
    },
    username:
    {
        type: String,
        required:true
    },
    is_bot:
    {
        type: String,
        required:true
    },
    messageCount: {
        type: Number,
        required: true
    }
});


const name = "message-counts";
module.exports =models[name] || model(name, messageCountSchema);