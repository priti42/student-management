var express = require('express');
var router = express.Router();
const axios = require('axios');
const { getStudent } = require('../services/createStudent');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/student/getStudent')
});

router.get('/student/edit', async (req, res, next) => {
  const studentData = await getStudent(req, res);
  res.render('student-page/student-form', {
    pageTitle: 'Student Edit',
    path: 'student/createStudent',
    studentData: studentData[0]
  })
})


router.get('/student/create', (req, res, next) => {
  res.render('student-page/student-form', {
    pageTitle: 'Student Create',
    path: 'student/create',
    studentData: null
  })
})

router.post("/filter", async (req, res) => {
  const paramsString = Object.keys(req.body).map(key => {
    if (req.body[key] == 'on') {
      return `${key}=true`
    }
    if (req.body[key]) {
      return `${key}=${req.body[key]}`
    }
    return null
  }).filter(d => d);
  req.query = paramsString.join("&");
  const studentData = await getStudent(req, res);
  if (req.body.csv) {
    res.redirect('http://localhost:3000/data.csv')
  }
  res.redirect('/student/getStudent?' + req.query)
})
module.exports = router;
