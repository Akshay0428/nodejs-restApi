const express = require('express');
const router = express.Router();
const Student = require('../model/student')
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

//get request
router.get('/',(req,res,next)=>{
    Student.find()
    .then(result=>{
        res.status(200).json({
            studentData:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
})

//post request
router.post('/',(req,res,next)=>{
    const student = new Student({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender
    })

    student.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            newStudent:result
        })
    })

    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//getById request
router.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            student:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
})

//delete request
router.delete('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.deleteOne({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:'Student Deleted',
            result:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
})

//Update - PUT Request
router.put('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            gender:req.body.gender
        }
    })
    .then(result=>{
        res.status(200).json({
            message:'Student Updated',
            result:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
})

module.exports = router;