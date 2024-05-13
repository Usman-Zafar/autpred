const Profile = require("../modals/profileSchema");
const Result = require("../modals/resultSchema");
const User = require("../modals/userSchema");

const caregiverControllers = {};

caregiverControllers.GetResults = async (req, res) => {
  const { userId } = req.query;
  try {
    const existingUser = await User.findOne({ _id: userId });
    const useremail = existingUser.email;
    const profilesearch = await Profile.findOne({ parentemail: useremail });
    const childname = profilesearch.childname;
    const resultsearch = await Result.find({ profileId: profilesearch._id });
    res.json({ resultsearch, childname });
  } catch (error) {
    res.status(500).json({ message: "Failed to Get Result" });
  }
};

module.exports = caregiverControllers;
