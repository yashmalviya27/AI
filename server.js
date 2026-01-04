require('dotenv').config();
const db = require('./src/db/db');
const app = require('./src/app');

db();



app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})