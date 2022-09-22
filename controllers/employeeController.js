const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    Employee.find({isDeleted: {$ne: true}}, (err, docs) => {
        const data = {data: [], status: false}
        if (!err) {
            res.send({status: true, data: docs})
        }
        else {
            res.send(data)
            console.log('Error in retrieving employee list :' + err);
        }
    });
});

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            { res.send({status: true, data: doc}) }
        }else{
            res.send({status: false, data: err});
        }
    });
});

router.post('/', (req, res) => {
    let employee = new Employee();
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.phone = req.body.phone;
    employee.address = req.body.address;
    employee.designation = req.body.designation;

    employee.save((err, doc) => {
        if (!err)
            res.send({status: true, data: doc})
        else {
            res.send({status: false, data: err})
        }
    });
});

router.put('/', (req, res) => {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.send({status: true, data: doc}) }
        else {
            res.send({status: false, data: err});
        }
    });
});

router.delete('/:id', (req, res) => {
    Employee.findOneAndUpdate({ _id: req.params.id }, {isDeleted: true}, { new: true }, (err, doc) => {
        if (!err) { res.send({status: true, data: doc}) }
        else {
            res.send({status: false, data: err});
        }
    });
});

module.exports = router;