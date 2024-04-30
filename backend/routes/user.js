const userControllers = require("../controllers/userController");
const { Router } = require("express");
const router = Router();

router.post("/signup", userControllers.Signup);
router.post("/signin", userControllers.Signin);
// router.get("/fetch-plans", agentControllers.fetchPlans);

module.exports = router;
