const express = require("express")
const router = express.Router();

const {
  capturePayment,
  verifyPayment,
  // verifyPayment,
  sendPaymentSuccessEmail,
} = require("../controllers/Payment")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

router.post("/capturePayment", auth, isStudent, capturePayment)

router.post("/verifyPayment", auth, isStudent, verifyPayment)
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isStudent,
  sendPaymentSuccessEmail
)
// router.post("/verifySignature", verifySignature)

module.exports = router

// const express = require("express")
// const router = express.Router()

// const {capturePayment, verifySignature, enrollStudents, sendPaymentSuccessEmail} = require("../controllers/Payment")
// const {auth, isInstructor,isAdmin, isStudent} = require("../middlewares/auth")

// router.post("/capturePayment", auth, isStudent, capturePayment)
// router.post("/verifySignature", auth, isStudent, verifySignature)

// module.exports = router;