const { createStudent, updateStudent, deleteStudent, getStudent } = require("../services/createStudent")
const { responseGenerator } = require("../utils/helper")

const createStudentController = async(req, res) => {
    try {
        const data = await createStudent(req, res)
        responseGenerator(res, data, 200, "student created successfully", null);
    } catch (error) {
        responseGenerator(res, null, 500, "error: student not created", error);
        throw new Error(error);
    }
}

const updateStudentController = async(req, res) => {
    try {
        const data = await updateStudent(req, res)
        responseGenerator(res, data, 200, "student updated successfully", null);
    } catch (error) {
        responseGenerator(res, null, 500, "error: student not updated", error);
        throw new Error(error);
    }
}

const deleteStudentController = async(req, res) => {
    try {
        const data = await deleteStudent(req, res)
        responseGenerator(res, data, 200, "student deleted successfully", null);
    } catch (error) {
        responseGenerator(res, null, 500, "error: student not deleted", error);
        throw new Error(error);
    }
}

const getStudentController = async(req, res) => {
    try {
        const data = await getStudent(req, res)
        responseGenerator(res, data, 200, "student found successfully", null);
    } catch (error) {
        responseGenerator(res, null, 500, "error: student not found", error);
        throw new Error(error);
    }
}
 
module.exports = {
    createStudentController,
    updateStudentController,
    deleteStudentController,
    getStudentController
}