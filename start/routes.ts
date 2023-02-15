/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('/animals', 'AnimalsController.listAnimals')
  Route.get('/animals/:specie', 'AnimalsController.searchBySpecie')
  Route.get('/baby-animals', 'AnimalsController.searchByAge')

  Route.post('/new-animal', 'AnimalsController.newAnimal')

  Route.put('/update-animal/:id', 'AnimalsController.updateAnimal')

  Route.delete('/delete-animal/:id', 'AnimalsController.deleteAnimal')
}).prefix('/api')
