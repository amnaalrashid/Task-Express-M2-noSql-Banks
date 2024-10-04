let accounts = require("../../accounts");
const AccountsSchema = require("../../models/AccountsSchema");

exports.accountCreate = async (req, res) => {
  try {
    const accountInfo = req.body;
    const newAccount = await AccountsSchema.create(accountInfo);
    return res.status(201).json({ data: newAccount });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  // const id = accounts[accounts.length - 1].id + 1;
  // const newAccount = { ...req.body, funds: 0, id };
  // accounts.push(newAccount);
  // res.status(201).json(newAccount);
};

exports.accountDelete = async (req, res) => {
  try {
    const { accountId } = req.params;
    const foundAccount = AccountsSchema.findById(
      (account) => account.id === +accountId
    );
    if (foundAccount) {
      accounts = accounts.filter((account) => account.id !== +accountId);
    }
  } catch (error) {}

  res.status(204).end();
  // } else {
  //   res.status(404).json({ message: "Account not found" });
  // }
};

exports.accountUpdate = (req, res) => {
  const { accountId } = req.params;
  const foundAccount = accounts.find((account) => account.id === +accountId);
  if (foundAccount) {
    foundAccount.funds = req.body.funds;
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Account not found" });
  }
};

exports.accountsGet = async (req, res) => {
  try {
    const accounts = await AccountsSchema.find().select(
      "-createdAt -updatedAt"
    );
    return res.status(200).json({ data: accounts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  const foundAccount = accounts.find(
    (account) => account.username === username
  );
  if (req.query.currency === "usd") {
    const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
    res.status(201).json(accountInUsd);
  }
  res.status(201).json(foundAccount);
};

exports.getVipAccounts = async (req, res) => {
  try {
    const minBalance = parseInt(req.query.minBalance);

    if (isNaN(minBalance)) {
      return res
        .status(400)
        .json({ error: "Invalid minBalance query parameter" });
    }

    const vipAccounts = await AccountsSchema.find({
      funds: { $gt: minBalance },
    }).select("-createdAt -updatedAt");

    return res.status(200).json({ data: vipAccounts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
