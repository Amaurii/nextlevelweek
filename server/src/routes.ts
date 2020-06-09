import express, { response, request } from 'express';
import knex from './database/connections';

const routes = express.Router(); 

routes.get('/', (request, response) =>{
    return response.json({message: 'Hello World'});
 });

 routes.get('/points', async(request, response)=>{
     const points = await knex('points').select('*');
     return response.json(points);
 });

routes.get('/items', async(request, response) => {
    const items = await knex('items').select('*');
    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`,
        };
    });
    return response.json(serializedItems);
});

routes.post('/points', async(request, response) =>{
    //recurso de desestruturação do Javascript
    const {
        name,
        email,
        whatsap,
        latitude,
        longitude,
        city,
        uf,
        items
    } = request.body;

   const ids = await knex('points').insert({
        image: 'image-fake',
        name,
        email,
        whatsap,
        latitude,
        longitude,
        city,
        uf
    });

    const pointItems = items.map((item_id: number) => {
        return{
            item_id,
            point_id: ids[0],
        };
    })
    await knex('point_items').insert(pointItems);
    return response.json({success: true});
});

 export default routes;