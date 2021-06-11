const express = require("express");
const router = express.Router();
const fs = require("fs");
const PDFDocument = require("pdfkit");
const bill = require("../../model/bills");
const path = require("path");
const nodemailer = require("nodemailer");
const setting = require("../../model/setting");

///haan ye bill ka pdf nikalne k lie hai by id. on demanding
//get bill by id creates the bill pdf for first time
router.get("/:id", (req, res) => {
  bill
    .findOne({ _id: req.params.id })
    .exec()
    .then((doc) => {
      return doc;
    })
    .then((invoice) => {
      let reqPath = String(
        path.join(
          path.join(__dirname, "../../"),
          "/bills/" + req.params.id + ".pdf"
        )
      );

      createInvoice(invoice, reqPath);

      function createInvoice(invoice, path) {
        let doc = new PDFDocument({ size: [250, 500], margin: 10 });
        generateHeader(doc);
        generateCustomerInformation(doc, invoice);
        generateInvoiceTable(doc, invoice);

        doc.end();
        doc.pipe(fs.createWriteStream(path));
        res.json({
          Message: "Pdf is generated you can view it",
          "File name ": req.params.id + ".pdf",
          Visit: "/billpdf/viewbill to view",
        });
      }
      function generateHeader(doc) {
        doc
          .fontSize(11)
          .text("Company Name", 10, 20, { align: "center" })
          .fontSize(8)
          .text("ACME Inc.", 10, 33, { align: "center" })
          .text("123 Main Street", 10, 43, { align: "center" })
          .moveDown();
      }
      function generateCustomerInformation(doc, invoice) {
        doc
          .fillColor("#444444")
          .fontSize(10)
          .font("Helvetica-Bold")
          .text("Tax Invoice", 10, 57, { align: "center" });

        generateHr(doc, 52);
        generateHr(doc, 72);
        const customerInformationTop = 75;

        doc
          .fontSize(6)
          .text("Invoice :", 10, customerInformationTop, {
            align: "left",
          })
          .font("Helvetica-Bold")
          .text(invoice._id, 35, customerInformationTop, { align: "left" })
          .font("Helvetica-Bold")

          .text("Customer:" + invoice.Customer, 60, customerInformationTop, {
            align: "right",
          })

          .text(invoice.Number, 30, customerInformationTop + 12, {
            align: "right",
          })
          .moveDown();

        generateHr(doc, customerInformationTop + 20);
      }

      function generateInvoiceTable(doc, invoice) {
        let i = 5;
        const invoiceTableTop = 110;

        doc.font("Helvetica-Bold");
        generateTableRow(
          doc,
          invoiceTableTop,
          "Name",
          "Category",
          "Price",
          "Quantity",
          "Discount",
          "tax",
          "Total"
        );
        generateHr(doc, invoiceTableTop + 20);
        doc.font("Helvetica");
        console.log(invoice.Product);
        invoice.Product.forEach((inv) => {
          //console.log(inv[0]);
          var x = 135;
          x = x + i;
          const Total =
            inv[0].quantity * inv[0].discounted_price * (1 + inv[0].tax / 100);
          //console.log(Total);
          generateTableRow(
            doc,
            x,
            inv[0].name,
            inv[0].category,
            inv[0].price,
            inv[0].quantity,
            inv[0].discount,
            inv[0].tax,
            Total.toFixed(2)
          );
          i = i + 10;
        });
        var z = 145 + i;
        generateHr(doc, z);
        doc
          .fontSize(10)
          .text("Total (Including Discount) :", 10, z + 5, {
            align: "left",
          })
          .font("Helvetica-Bold")
          .text(invoice.SubTotal.toFixed(2), 55, z + 5, {
            align: "right",
          });
      }

      function generateTableRow(
        doc,
        y,
        name,
        category,
        price,
        quantity,
        discount,
        tax,
        Total
      ) {
        doc
          .fontSize(8)
          .text(name, 5, y)
          .text(category, 45, y)
          .text(price, 85, y)
          .text(quantity, 115, y)
          .text(discount, 155, y)
          .text(tax, 185, y)
          .text(Total, 210, y);
      }
      function generateHr(doc, y) {
        doc
          .strokeColor("#aaaaaa")
          .lineWidth(2)
          .moveTo(0, y)
          .lineTo(550, y)
          .stroke();
      }
    });
});
//View bill pdf in browser to print by bill id
router.get("/viewbill/:bid", (req, res, next) => {
  let reqPath = String(
    path.join(
      path.join(__dirname, "../../"),
      "/bills/" + req.params.bid + ".pdf"
    )
  );
  fs.readFile(reqPath, function (err, data) {
    if (data) {
      res.contentType("application/pdf");
      res.send(data);
    }
    if (err) {
      res.json(err);
    }
  });
});
//Send bill to email
//Take email details in query

router.get("/sendmail/:bid", (req, res, next) => {
  let reqPath = String(
    path.join(
      path.join(__dirname, "../../"),
      "/bills/" + req.params.bid + ".pdf"
    )
  );
  var email = req.query.email;
  const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cloudposmailer@gmail.com",
      pass: "qa1ws23ed", // naturally, replace both with your real credentials or an application-specific password
    },
  });

  const mailOptions = {
    from: "Billings<vindication@enron.com>",
    to: email,
    subject: "Your Bill Details",
    attachments: [
      {
        filename: req.params.bid + ".pdf",
        path: reqPath,
        contentType: "application/pdf",
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json(error);
    } else {
      res.json("Email sent: " + info.response);
    }
  });
});

module.exports = router;
