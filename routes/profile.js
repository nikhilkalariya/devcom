const express = require('express');
const router = express.Router();
const { check,  } = require('express-validator');
const auth = require('../middleware/auth');
const profileController = require('../controllers/profileController');

const Profile = require('../models/profile');
const Experience = require('../models/experience');
const Education = require('../models/education');
router.get('/me', auth, profileController.getProfile);

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills are required').not().isEmpty(),
    ],
  ],
  profileController.createOrUpdateProfile
);

router.delete('/', auth, profileController.deleteProfile);
router.put(
    '/experience',
    [
      auth,
      [
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty(),
      ],
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  
      const { title, company, location, from, to, current, description } = req.body;
  
      try {
        const profile = await Profile.findOne({ where: { userId: req.user.id } });
  
        if (!profile) {
          return res.status(400).json({ msg: 'Profile not found' });
        }
  
        const experience = await Experience.create({
          profileId: profile.id,
          title,
          company,
          location,
          from,
          to,
          current,
          description,
        });
  
        res.json(experience);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  
  // Delete experience from profile
  router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
      const experience = await Experience.findOne({
        where: { id: req.params.exp_id, profileId: req.user.id },
      });
  
      if (!experience) {
        return res.status(404).json({ msg: 'Experience not found' });
      }
  
      await experience.destroy();
  
      res.json({ msg: 'Experience removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // Add education to profile
  router.put(
    '/education',
    [
      auth,
      [
        check('school', 'School is required').not().isEmpty(),
        check('degree', 'Degree is required').not().isEmpty(),
        check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty(),
      ],
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  
      const { school, degree, fieldofstudy, from, to, current, description } = req.body;
  
      try {
        const profile = await Profile.findOne({ where: { userId: req.user.id } });
  
        if (!profile) {
          return res.status(400).json({ msg: 'Profile not found' });
        }
  
        const education = await Education.create({
          profileId: profile.id,
          school,
          degree,
          fieldofstudy,
          from,
          to,
          current,
          description,
        });
  
        res.json(education);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  
  // Delete education from profile
  router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
      const education = await Education.findOne({
        where: { id: req.params.edu_id, profileId: req.user.id },
      });
  
      if (!education) {
        return res.status(404).json({ msg: 'Education not found' });
      }
  
      await education.destroy();
  
      res.json({ msg: 'Education removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;
