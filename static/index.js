const express = require('express');
const path = require('path');
const app = express();
const port = 3002;

// Serve static files from the "static" directory
app.use(express.static(path.join(__dirname, 'static')));

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
