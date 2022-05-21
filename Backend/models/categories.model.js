const mongoose = require('mongoose');

mongoose.model('Category', new mongoose.Schema({
    category: {
        type: String,
        required: 'This field is required.'
    }
}));