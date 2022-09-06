require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const exhbs = require('express-handlebars');
const todosRoutes = require('./routes/todos');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exhbs.create({
	defaultLayout: 'main',
	extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(todosRoutes);
async function start() {
	try {
		await mongoose.connect('mongodb+srv://ArsenDB:1q2w3e4r@cluster0.7nmia.mongodb.net/todos', {
			// useNewUrlParser: true,
			// useFindAndModify: false,
		});

		app.listen(PORT, () => {
			console.log('server running on port ' + PORT);
		});
	} catch (error) {
		console.log(error);
	}
}

start();
