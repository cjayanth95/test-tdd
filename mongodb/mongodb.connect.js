const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://username:supertest@cluster0.lswyyp9.mongodb.net/test?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (e) {
    console.log(e);
  }

}

async function disconnect() {
    try {
      await mongoose.disconnect();
    } catch (e) {
      console.log(e);
    }
  }
module.exports = { connect, disconnect };
