const StudentModel = require('../models/student.model');
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("public/data.csv");

const createStudent = async (req, res) => {
    try {
        const studentData = await StudentModel.create(req.body);
        return studentData;
    } catch (error) {
        throw new Error("message: error in create student service: " + error.message);
    }
}
const updateStudent = async (req, res) => {
    try {
        const studentData = await StudentModel.updateOne({ id: req.body.id }, req.body);
        return studentData;
    } catch (error) {
        throw new Error("message: error in updated student service: " + error.message);
    }
}

const deleteStudent = async (req, res) => {
    try {
        const studentData = await StudentModel.deleteOne({ id: req.params.id });
        return studentData;
    } catch (error) {
        throw new Error("message: error in updated student service: " + error.message);
    }
}

const getStudent = async (req, res) => {
    try {
        const { id, firstname, lastname, standard, city, state, country, skip, limit, csv } = req.query;
        let filterObj = {}

        let defaultPagination = {
            limit: 10,
            skip: 0,
        }

        if (id) {
            filterObj = { id: +id }
        }

        if (firstname) {
            filterObj = { ...filterObj, firstname: { $regex: firstname, $options: 'i' } }
        }
        if (lastname) {
            filterObj = { ...filterObj, lastname: { $regex: lastname, $options: 'i' } }
        }

        if (standard) {
            filterObj = { ...filterObj, standard: +standard }
        }
        if (city) {
            filterObj = { ...filterObj, ["address.city"]: city }
        }

        if (state) {
            filterObj = { ...filterObj, ["address.state"]: state }
        }
        if (country) {
            filterObj = { ...filterObj, ["address.country"]: country }
        }


        const studentData = await StudentModel.aggregate([
            { $match: filterObj },
            { $skip: skip ? +skip : defaultPagination.skip },
            { $limit: limit ? +limit : defaultPagination.limit },

        ]);

        if (studentData.length > 0 && csv == "true") {
            await csvDownload(studentData)
        }
        return studentData;
    } catch (error) {
        throw new Error("message: error in found student service: " + error.message);
    }
}

function csvDownload(data){
    return new Promise(function(resolve, reject) {
        fastcsv
        .write(data, { headers: true })
        .on("finish", function () {
            console.log("Write to CSV successfully!");
            resolve();
        })
        .pipe(ws);
    });

}

module.exports = {
    createStudent,
    updateStudent,
    deleteStudent,
    getStudent
}