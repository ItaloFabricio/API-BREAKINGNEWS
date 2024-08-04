const mongoose = require("mongoose");

const connectDatabase = () => {
  console.log("Wait connecting to the database");

  mongoose
    .connect(
      "mongodb+srv://italofps65:wEKrYtyN2coP0GVY@cluster0.kbm99jy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch((error) => console.log(error));
};

module.exports = connectDatabase;
