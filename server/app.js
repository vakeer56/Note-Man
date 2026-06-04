const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send("Test API is working...")
})

app.listen(PORT, () => {
    console.log(`Server is running on port $${PORT}...`);
})
