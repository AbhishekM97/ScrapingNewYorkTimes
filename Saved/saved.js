var mongoose = require("mongoose");
var schema = mongoose.Schema;

var savedSchema = new schema ({
    title: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    }
});

var Saved = mongoose.model("Saved", savedSchema);
module.exports = Saved;