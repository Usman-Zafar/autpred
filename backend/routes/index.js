const { Router } = require("express");
const router = Router();

const caregiverRoutes = require("../routes/caregiver");
const therapisrRoutes = require("../routes/therapist");
const userRoutes = require("../routes/user");

router.use("/caregiver", caregiverRoutes);
router.use("/therapist", therapisrRoutes);
router.use("/user", userRoutes);

module.exports = router;
