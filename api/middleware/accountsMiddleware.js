const db = require("../../data/dbConfig");

const validateAccountID = (req, res, next) => {
  const { id } = req.params;
  db("accounts")
    .select()
    .where({ id })
    .first()
    .then((account) => {
      if (account) {
        req.account = account;
        next();
      } else throw "Account not found";
    })
    .catch((err) => {
      res.status(404).json({ message: "Account not found" });
    });
};

const validateAccount = (req, res, next) => {
  const { body: newAccount } = req;
  if (!newAccount.name && !newAccount.budget)
    res.status(404).json({ message: "No account info provided" });
  else if (!newAccount.name || !newAccount.budget)
    res.status(404).json({ message: "Name and budget are required" });
  else next();
};

module.exports = {
  validateAccount,
  validateAccountID,
};
