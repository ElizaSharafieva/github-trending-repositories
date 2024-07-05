const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
// const adress = process.env.DB_ADDRESS;

const { PORT = 3000 } = process.env

const app = express()

app.use(express.json())

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));

mongoose.connect('mongodb://127.0.0.1:27017/topRepositories')

app.use('/', require('./routes/repoRoutes'))

app.get('/', (req, res) => {
	res.status(200);
	res.json({ message: 'Server running!' });
	res.end();
});

// app.use((err, req, res, next) => {

//   console.log(res.status)
//   console.log(res.message)
//   const { statusCode = 500, message } = err;

//   res
//     .status(statusCode)
//     .send({
//       message: statusCode === 500
//         ? 'Произошла ошибка в работе сервера'
//         : message,
//     });
//   next();
// });

// app.use('/*', (req, res, next) => {
//   next(new NotFoundError('Страница не найдена.'));
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
}) 