const offers = require("../model/offer");
module.exports = {
    alloffers: (req, res, next) => {
        const oId = req.params.oId;
        if (oId === "all") {
            offers.find().exec(function (err, data) {
                res.status(200).json({ data: data });
            });
        } else {
            offers
                .findById(oId)
                .exec()
                .then(result => {
                    res.json({
                        message: "Found Offer with ID",
                        id: oId,
                        product: result
                    });
                });
        }
    },

    addeoffers: (req, res, next) => {
        const offerdetails = new offers({
            offername: req.body.offername,
            offerdiscount: req.body.offerdiscount,
            offercode: req.body.offercode
        });
        offerdetails.save().then(result => {
            console.log(result);
        });
        res.status(200).json({
            message: " Offer Added ",
            object: offerdetails
        });
    },

    updateoffers: (req, res, next) => {
        const oId = req.params.oId;
        const Update = {};

        if (req.body.offername) Update.offername = req.body.offername;
        if (req.body.offerdiscount) Update.offerdiscount = req.body.offerdiscount;
        if (req.body.offercode) Update.offercode = req.body.offercode;

        var doc = offers.findOneAndUpdate(
            { _id: oId },
            { $set: Update },
            {
                new: true
            },
            function (err, doc) {
                if (err) {
                    console.log("err");
                } else {
                    res.status(202).json({
                        message: "Updated offer",
                        data: doc
                    });
                }
            }
        );
    },

    deleteoffers: (req, res, next) => {
        const oId = req.params.oId;
        console.log(oId);
        if (oId === "all") {
            offers
                .remove({})
                .exec()
                .then(result => {
                    console.log("Everything deleted");
                    res.json({
                        message: "Deleted all the offers listed below",
                        result: result
                    });
                });
        } else {
            offers
                .findByIdAndRemove(oId)
                .exec()
                .then(result => {
                    res.json({
                        message: "Found offers with Id And Removed",
                        id: oId,
                        product: result
                    });
          });
        }
    }
};
