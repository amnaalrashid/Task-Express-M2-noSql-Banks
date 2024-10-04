const { Schema, model } = require("mongoose");

const AccountsSchema = new Schema({
  username: {
    type: String,
    required: true,
    null: false,
  },
  funds: {
    type: Number,
    default: 0,
  },
});

module.exports = model("Accounts", AccountsSchema);
