const express = require("express");
const router = express.Router();
const {
  accountsGet,
  accountCreate,
  accountDelete,
  accountUpdate,
  getVipAccounts,
} = require("./accounts.controllers");

router.get("/", accountsGet);
router.post("/", accountCreate);
router.delete("/:accountId", accountDelete);
router.put("/:accountId", accountUpdate);
router.get("/vip", getVipAccounts);

module.exports = router;
