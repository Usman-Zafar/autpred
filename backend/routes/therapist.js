const therapistControllers = require("../controllers/therapistControllers");
const { Router } = require("express");
const router = Router();

router.post("/add-profile", therapistControllers.AddProfile);
router.get("/get-profiles", therapistControllers.GetProfile);
router.post("/add-therapy-details", therapistControllers.AddTherapyDetails);
router.get("/get-therapy-details", therapistControllers.GetTherapyDetails)
router.post("/result", therapistControllers.AddResults)

module.exports = router;