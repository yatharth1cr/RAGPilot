const express = require("express");
const upload = require("../middlewares/uploadPdf");
const {
  ingestPdfHandler,
  queryHandler,
} = require("../controllers/ragController");

const router = express.Router();

router.post("/upload", upload.single("pdf"), ingestPdfHandler);
router.post("/query", queryHandler);

module.exports = router;
