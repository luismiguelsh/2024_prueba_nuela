import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/prueba_profesores', {
    // @ts-ignore
  useNewUrlParser: true,
  // @ts-ignore
  useUnifiedTopology: true,
  // @ts-ignore
  useFindAndModify: false,
  // @ts-ignore
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});