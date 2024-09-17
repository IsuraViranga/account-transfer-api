const express = require('express');
const cors = require('cors');  
require('dotenv').config();

const transferRoutes = require('./routes/transferRoutes');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', transferRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
