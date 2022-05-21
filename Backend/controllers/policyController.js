const router = require('express').Router();
const model = require('mongoose').model('Policy');



router.get('/getAllPolicies', (req, res) => {
    model.find((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Error in retrieving policy list :' + err);
            res.status(400).send(err);
        }
    });

});

router.get('/getPoliciesByCategory/:category', (req, res) => {
    model.find({ category: req.params.category }, (err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Error in retrieving policy list :' + err);
            res.status(400).send(err);
        }
    });

});

router.post('/addPolicy', (req, res) => {
    const policy = new model();
    policy.policyNumber = req.body.policyNumber;
    policy.policyDescription = req.body.policyDescription;
    policy.category = req.body.category;
    policy.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
                console.log('Error during record insertion : ' + err);
                res.status(400).send(err);
        }
    }); 
});

router.put('/updatePolicy', (req, res) => {
    model.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else {
                console.log('Error during record update : ' + err);
                res.status(400).send(err);
        }
    });
});

router.delete('/deletePolicy/:id', (req, res) => {
    model.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log('Error in employee delete :' + err);
            res.status(400).send(err);
    });
});

module.exports = router;