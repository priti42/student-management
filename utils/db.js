const mongoose = require('mongoose');
const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true, };


// Connection for MongoDB Database
mongoose.connect(process.env.MONGO_DB_SRV, connectionOptions)
.then(() => {
    console.log("DB CONNECTED");
}).catch( (error) =>{
    console.log("Error occured in DB", error)}
);

module.exports = mongoose;