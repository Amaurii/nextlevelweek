import express, { response, request } from 'express';
import PointsController from './controllers/PointsControlle';
import ItemsController from './controllers/ItemsControlle';

const routes = express.Router(); 

const pointsController = new PointsController();
const itemsControlle = new ItemsController();



routes.get('/items', itemsControlle.index);
routes.get('/points', pointsController.index);
routes.post('/points', pointsController.create);
routes.get('/points/:id', pointsController.show);

// index, show, create, update, delete

// Service Patter
// Repository Patter (Data Mapper)

 export default routes;