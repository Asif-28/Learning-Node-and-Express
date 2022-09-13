const express = require('express');
const fs = require('fs');
const { writeFile } = require('fs/promises');
const app = express();
app.use(express.json()); // middleware use in post requset to ascess the body  of the request
// adding the middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// read all the objects from the files
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Route handlers

const getAllTours = (req, res) => {
  console.log(req.requsetTime);
  res.status(200).json({
    status: 'success',
    data: {
      requestTimeAt: req.requestTime,
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params); //request params comtains all the variable
  const id = req.params.id * 1; //convert the string into number

  const tour = tours.find((el) => el.id === id); // to find the element of the given id
  //if (id > tours.length)
  if (!tour)
    return res.status(404).json({ status: 'failed', message: 'Invalid id' });
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: tour,
  });
};

const addTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body); // object.assign method works by merging the objects
  tours.push(newTour); // push method is used to push new element into the araay list

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    }
  );
};
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length)
    return res.status(404).json({ status: 'failed', message: 'Invalid id' });

  res.status(200).json({
    status: 'success',
    data: 'updated the tour ',
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length)
    return res.status(404).json({ status: 'failed', message: 'Invalid id' });

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

//All the routes
app.get('/api/v1/tours');
app.post('/api/v1/tours');
app.get('/api/v1/tours/:id');
app.patch('/api/v1/tours/:id');
app.delete('/api/v1/tours/:id');

app.route('/api/v1/tours').get(getAllTours).post(addTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'listening on the server side ', app: 'notorous ' });
// });
// app.post('/', (req, res) => {
//   res.send('You can post on this server side ');
// });
//Listening st the server
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
