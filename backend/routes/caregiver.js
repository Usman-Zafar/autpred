const caregiverControllers = require("../controllers/caretakerControllers");
const { Router } = require("express");
const router = Router();

router.get("/get-therapy-result", caregiverControllers.GetResults);


module.exports = router;
