const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    userId: {
        type: String,
    },
    name: {
        type: String,
    },
    biography:{
        type:String
    },
    profile_path:{
        type:String
    },
    id: {
        type: Number
    },
    type:{
        type: String
    }
});

const Person = mongoose.model('persons', PersonSchema);
module.exports = Person;