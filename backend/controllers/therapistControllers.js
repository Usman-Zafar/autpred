const Profile = require("../modals/profileSchema");
const TherapyDetails = require("../modals/therapydetails");
const Result = require("../modals/resultSchema");

const therapistControllers = {};

therapistControllers.AddProfile = async (req, res) => {
  try {
    req.body.numberoftherapies = 0;
    await Profile.create({ ...req.body });
    return res.status(200).json({ message: "Profile Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to Add Profile" });
  }
};

therapistControllers.GetProfile = async (req, res) => {
  const { userId } = req.query;
  try {
    const existingProfiles = await Profile.find({ userId });

    if (!existingProfiles || existingProfiles.length === 0) {
      return res.status(404).json({ error: "No Profile Added So Far." });
    }

    res.json({ existingProfiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to Get Profiles" });
  }
};

therapistControllers.AddTherapyDetails = async (req, res) => {
  try {
    const userId = req.body.userId;
    const childname = req.body.childname;
    const profileofchild = await Profile.findOne({ userId, childname });
    req.body.profileId = profileofchild.id;
    await Profile.updateOne(
      { _id: profileofchild.id },
      { $inc: { numberoftherapies: 1 } }
    );
    const therapychild = await Profile.findOne({ _id: profileofchild.id });
    req.body.therapysession = therapychild.numberoftherapies;
    await TherapyDetails.create({ ...req.body });
    return res.status(200).json({ message: "Therapy Details Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to Add Profile" });
  }
};

therapistControllers.GetTherapyDetails = async (req, res) => {
  const { userId } = req.query;
  try {
    const existingTherapyDetails = await TherapyDetails.find({ userId });
    if (!existingTherapyDetails || existingTherapyDetails.length === 0) {
      return res.status(404).json({ error: "No Profile Added So Far." });
    }
    res.json({ existingTherapyDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to Get Profiles" });
  }
};

therapistControllers.AddResults = async (req, res) => {
  try {
    await Result.create({ ...req.body });
    return res.status(200).json({ message: "Result Added" });
  } catch (error) {
    res.status(500).json({ message: "Failed to Store Result" });
  }
};

module.exports = therapistControllers;
