const express = require('express');
const app = express()

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const posrRoute = require('./routes/posts')

dotenv.config();

const port = process.env.PORT || 3000;

const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Database connected ');
  } catch (error) {
    console.log(error);
  }
};

dbconnect();


//meddleware

app.use(express.json());  
app.use(helmet());
app.use(morgan("common")); 
//meddleware_end

app.use('/api/users', userRoute)

app.use('/api/auth', authRoute)

app.use('/api/posts', posrRoute)

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
}); 