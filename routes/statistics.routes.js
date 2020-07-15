const {Router} = require('express');
const User = require('../models/User');
const router = Router();
const auth = require('../middleware/auth.middleware');

router.post(
	'/statistics',
	auth,
	async (req, res) => {
		const statistics = req.body;
		const user = await User.findById(req.user.userId);
		user.statistics = statistics;
		await user.save();
	}
);

module.exports = router;