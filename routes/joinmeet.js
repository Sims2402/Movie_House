const router = require("express").Router();
const express = require("express");
const app = express();
const server = require('http').Server(app);

const {
    v4: uuidV4 
  } = require('uuid');
  const {
    validate: uuidValidate
  } = require('uuid');
  const {
    ExpressPeerServer
  } = require('peer');
  const peerServer = ExpressPeerServer(server, {
    debug: true
  });


router.get('/', function(req, res) {
    req.session.error = '';
    res.render('joinmeet', {
      isAuth: req.session.isAuth,
      message: "",
      title: "Join | "
    });
  })


  router.post('/', function(req, res) {
    let meetId = req.body.meetid;
    if (uuidValidate(meetId)) { //validates if used a proper uuidV4
      let userName = req.body.name;
      let video = req.body.video;
      let audio = req.body.audio;
      if (video == 'on') {
        video = true;
      } else {
        video = false;
      }
      if (audio == 'on') {
        audio = true;
      } else {
        audio = false;
      }
      if (!userName) {
        userName = 'Imposter'
      }
      res.render('meet', {
        meetId: meetId,
        title: '',
        userName: userName,
        video: video,
        chats: [],
        audio: audio,
        isAuth: req.session.isAuth,
        title: 'Create Meet | '
      })
    } else {
      res.render('/', {
        isAuth: req.session.isAuth,
        message: "Invalid meetId!!",
        title: "Join | "
      });
    }
  })
  
  module.exports = router;