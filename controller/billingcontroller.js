const bill = require("../model/bills");
module.exports = {
  AllBills: (req, res, next) => {
    bill
      .find()
      .exec()
      .then((result) => {
        res.status(400).json({ Here_are_your_bills: result });
      })
      .catch((err) => res.status(400).json({ message: err }));
  },
  BillByCustomer: (req, res, next) => {
    if (req.query.customer)
      bill
        .find({ Customer: req.params.customer })
        .exec()
        .then((result) => {
          res.status(200).json({ message: result });
        })
        .catch((err) => res.status(400).json({ message: err }));
    if (req.query.Pmethod)
      bill
        .find({ Pmethod: req.params.Pmethod })
        .exec()
        .then((result) => {
          res.status(200).json({ message: result });
        })
        .catch((err) => res.status(400).json({ message: err }));
    if (req.query.id)
      bill
        .find({ _id: req.params.id })
        .exec()
        .then((result) => {
          res.status(200).json({ message: result });
        })
        .catch((err) => res.status(400).json({ message: err }));
  },
  DeleteBillByCustomer: (req, res, next) => {
    bill
      .remove({ _id: req.params.id })
      .exec()
      .then((result) => {
        res.status(400).json({ message: result });
      })
      .catch((err) => res.status(400).json({ message: err }));
  },
};
