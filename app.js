const express = require('express');
const fs = require('fs');
const { writeFile } = require('fs/promises');
const app = express();
app.use(express.json()); // middleware use in post requset to ascess the body  of the request
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params); //request params comtains all the variable
  const id = req.params.id * 1; //convert the string into number
  const tour = tours.find((el) => el.id === id); // to find the element of the given id
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: tour,
  });
});

app.post('/api/v1/tours', (req, res) => {
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
});

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'listening on the server side ', app: 'notorous ' });
// });
// app.post('/', (req, res) => {
//   res.send('You can post on this server side ');
// });
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
