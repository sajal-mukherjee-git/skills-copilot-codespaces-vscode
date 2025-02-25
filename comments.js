// Create web server for comments


// Use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up comments file
const commentsFile = path.join(__dirname, 'comments.json');

// Create a route to get comments
app.get('/comments', (req, res) => {
  fs.readFile(commentsFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments file');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Create a route to post comments
app.post('/comments', (req, res) => {
  if (!req.body.name || !req.body.comment) {
    res.status(400).send('Name and comment are required');
    return;
  }
  fs.readFile(commentsFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments file');
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile(commentsFile, JSON.stringify(comments, null, 2), (err) => {
        if (err) {
          res.status(500).send('Error writing comments file');
        } else {
          res.status(201).send('Comment added');
        }
      });
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

