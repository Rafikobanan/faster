const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const mongoose = require('mongoose');

const app = express();

app.use(express.json({extended: true, limit: '5mb'}));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api', require('./routes/data.routes'));

app.use('/', express.static(path.join(__dirname, 'client', 'build')))

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

const PORT = process.env.PORT || 5000;

async function start() {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});
		app.listen(PORT, () => 
			console.log(`App has been started on port ${PORT}`)
		);
	} catch (e) {
		console.log(e);
	}
}

start();