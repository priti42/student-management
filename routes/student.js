const express = require('express');
const { createStudentController, updateStudentController, deleteStudentController, getStudentController } = require('../controller/createStudentController');
const { createSchema } = require('../middleware/schema-validator');
const { CREATE_STUDENT, UPDATE_STUDENT, DELETE_STUDENT, GET_STUDENT } = require('../utils/constants/routeConstants');
const router = express.Router();


router.post(CREATE_STUDENT, createSchema, createStudentController);

router.put(UPDATE_STUDENT, updateStudentController);

router.delete(DELETE_STUDENT, deleteStudentController);

router.get(GET_STUDENT, getStudentController);


module.exports = router