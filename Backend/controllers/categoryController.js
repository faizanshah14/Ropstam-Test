const router = require('express').Router();
const model = require('mongoose').model('Category');

router.get('/getAllCategories', (req, res) => {
    model.find((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            res.status(400).send(err);
            console.log('Error in retrieving category list :' + err);
        }
    });
});

router.post('/createCategory', (req, res) => {
    const category = new model();
    category.category = req.body.category;
    category.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            res.status(400).send(err);
                console.log('Error during record insertion : ' + err);
        }
    }); 
});

router.delete('/deleteCategory', (req, res) => {
    model.findByIdAndRemove(req.body._id, (err, doc) => {
        if (!err)
            res.send('Deleted successfully');
        else{
            res.status(400).send(err);
        
            console.log('Error in category delete :' + err);
        }
    });
});

router.put('/updateCategory', (req, res) => {
    model.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else {
            res.status(400).send(err);
                console.log('Error during record update : ' + err);
        }
    });
});
module.exports = router;