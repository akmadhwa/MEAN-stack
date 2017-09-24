let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');

let video = require('../models/video');

let db = 'mongodb://akma:123@ds149144.mlab.com:49144/video-playlist';
mongoose.connect(db,{useMongoClient:true, promiseLibrary: global.Promise});

// Get all video list
router.get('/videos', function(req,res) {
    console.log('GET the videos');
    video.find({})
    .exec(function(err, videos) {
        if(err) {
            console.log('error retrieving videos');
        } else {
            res.json(videos)
        }
    })
});

// Get video by id
router.get('/videos/:id', function(req,res) {
    console.log('GET the videos by id');
    video.findById(req.params.id)
    .exec(function(err, videos) {
        if(err) {
            console.log('error retrieving videos');
        } else {
            res.json(videos)
        }
    })
});

// Save videos
router.post('/video', function(req, res) {
    var newVideos = new video( {
        title : req.body.title,
        url : req.body.url,
        description : req.body.description,
    })
    newVideos.save(function(err,data) {
        if(err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });

});

// Update the data
router.post('/video/:id', function(req, res) {
   video.findByIdAndUpdate(req.params.id, {
       $set : {
           title : req.body.title,
           url : req.body.url,
           description : req.body.description,
       }
   }, {
       new : true
   } ,function(err, updatedData) {
       if(err) {
           console.log(err);
       } else {
           res.json(updatedData);
       }
   })

});

// Delete the data
router.delete('/video/:id', function(req, res) {
    video.findByIdAndRemove(req.params.id, function(err, deletedData) {
        if(err) {
            res.send(err);
        } else {
            res.json(deletedData);
        }
    })
 
 });

module.exports = router;