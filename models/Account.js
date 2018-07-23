const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    validate: {
      validator(v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: '{VALUE} is not a valid e-mail!'
    },
    required: [true, 'E-mail is required.']
  }
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;