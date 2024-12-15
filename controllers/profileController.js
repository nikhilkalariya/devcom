const Profile = require('../models/profile');
const Education = require('../models/education');
const Experience = require('../models/experience');
const Social = require('../models/social');

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ where: { userId: req.user.id } });
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.createOrUpdateProfile = async (req, res) => {
  const { company, website, location, bio, status, githubusername, skills } = req.body;
  const profileFields = {
    userId: req.user.id,
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills: skills.split(',').map(skill => skill.trim()),
  };

  try {
    let profile = await Profile.findOne({ where: { userId: req.user.id } });
    if (profile) {
      profile = await Profile.update(profileFields, { where: { userId: req.user.id } });
      return res.json(profile);
    }

    profile = await Profile.create(profileFields);
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    await Profile.destroy({ where: { userId: req.user.id } });
    res.json({ msg: 'Profile deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add more functions for education, experience, and social as needed

