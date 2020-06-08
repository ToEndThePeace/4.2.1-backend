const router = require("express").Router();

const db = require("../../data/dbConfig.js");
const {
  validateAccountID: checkID,
  validateAccount: checkBody,
} = require("../middleware/accountsMiddleware");

router.get("/", (req, res) => {
  db("accounts")
    .select()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(({ message }) => {
      res.status(500).json({ message });
    });
});

router.get("/:id", checkID, (req, res) => {
  res.status(200).json(req.account);
});

router.post("/", checkBody, (req, res) => {
  db("accounts")
    .insert(req.body)
    .then(([id]) => {
      res.status(200).json({ id });
    })
    .catch((err) => {
      res.status(500).json({ message: "Unable to create account" });
    });
});

router.put("/:id", checkID, (req, res) => {
  const { id } = req.params;
  const { body: changes } = req;
  db("accounts")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count > 0) res.status(204).end();
      else res.status(404).json({ message: "Account not found" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "An error occurred while updating the account" });
    });
});

router.delete("/:id", checkID, (req, res) => {
  const { id } = req.params;
  db("accounts")
    .where({ id })
    .del()
    .then((count) => {
      res.status(200).json(count);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "An error occurred while deleting the account" });
    });
});

module.exports = router;
