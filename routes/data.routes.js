const {Router} = require('express');
const User = require('../models/User');
const router = Router();
const auth = require('../middleware/auth.middleware');

router.post(
	'/data',
	auth,
	async (req, res) => {
		try {
			const body = req.body;

			if (body.text.length > 1000000) body.text = '';

			const data = {
				text: body.text,
				styles: {
					fontSize: body.styles.fontSize,
					fontFamily: body.styles.fontFamily,
					marginTop: body.styles.marginTop,
				},
				speed: body.speed,
				theme: body.theme,
				statistics: body.statistics,
				language: body.language,
			};

			const user = await User.findById(req.user.userId);
			user.data = data;
			await user.save();
			return res.json({message: ''});
		} catch (e) {
			res.status(500).json({ message: 'Something went wrong' });
		}
	}
);

router.get(
	'/data',
	auth,
	async (req, res) => {
		try {
			const user = await User.findById(req.user.userId);
			if (user.data) {
				res.json(user.data);
			} else {
				res.json({});
			}
		} catch (e) {
			res.status(500).json({ message: 'Something went wrong' });
		}
	}
)

module.exports = router;