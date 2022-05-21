const mongoose = require('mongoose');

mongoose.model('Policy', new mongoose.Schema({
    policyNumber: {
        type: String,
        required: 'This field is required.',
        unique: true
    },
    policyDescription: {
        type: String,
        required: 'This field is required.'
    },
    category: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
}));