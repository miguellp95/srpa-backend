//Dependencies
import express, { Application } from 'express';
import morgan from 'morgan';
import path from 'path';  

import srpa_user from './routes/srpa-user.route'
import employee from './routes/employee.route';
import user from './routes/user.route';

const app: Application = express();

// Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json()); 


//Routes
app.use('/api/srpa', user);
app.use('/api/srpa', srpa_user);
app.use('/api/srpa/', employee);

//Static
app.use('/public', express.static(path.resolve('public')));

export default app;