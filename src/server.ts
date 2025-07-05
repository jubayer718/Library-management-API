import dotenv from 'dotenv';
import app from './app';
import mongoose from 'mongoose';
import config from './app/config';
dotenv.config();



const main = async() => { 
try {
  await mongoose.connect(config.db_Uri as string);
  console.log('mongodb connected');
  
  app.listen(config.port, () => {
    console.log(`server running on port ${config.port}`)
  })
} catch (error) {
  console.log("mongodb error",error);
}

}
main();
