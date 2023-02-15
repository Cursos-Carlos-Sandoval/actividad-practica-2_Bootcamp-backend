import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Animal from '../../Models/Animal'
import DatabaseAdapter from '../Utils/DatabaseAdapter'

export default class AnimalsController {
  private async getExistingAnimals(id: Number): Promise<Number> {
    const query = await Animal.query().where({ id: id }).count('*').from('animals')
    return DatabaseAdapter.parseCountObject(query)
  }

  public async newAnimal({ request, response }: HttpContextContract) {
    try {
      const animalData = request.only(['id', 'name', 'species', 'breed', 'gender', 'age'])
      const existingAnimalsCounter: Number = await this.getExistingAnimals(animalData.id)

      // Animal exists
      if (existingAnimalsCounter !== 0) {
        response.status(400).json({ msg: 'Error, the animal is already registered!' })
        return
      }

      // Create Animal
      await Animal.create(animalData)
      response.status(200).json({ msg: 'Animal table record created' })
    } catch (error) {
      console.error(error)
      response.status(500).json({ msg: 'Internal server problem!' })
    }
  }

  public async listAnimals(): Promise<Animal[]> {
    return await Animal.all()
  }

  public async searchBySpecie({ request }: HttpContextContract) {
    const specie = request.param('specie')
    return await Animal.query().where('species', specie)
  }

  public async searchByAge() {
    const age = 8
    return await Animal.query().where('age', '<', age)
  }

  public async updateAnimal({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const animalData = request.all()

    try {
      await Animal.query().where('id', id).update({
        id: animalData.id,
        name: animalData.name,
        species: animalData.species,
        breed: animalData.breed,
        gender: animalData.gender,
        age: animalData.age,
      })

      response.status(200).json({ msg: 'Animal record has been updated' })
    } catch (error) {
      console.error(error)
      response.status(500).json({ msg: 'Internal server error' })
    }
  }

  public async deleteAnimal({ request, response }: HttpContextContract) {
    const id = request.param('id')

    try {
      await Animal.query().where('id', id).delete()
      response.status(200).json({ msg: 'Animal record successfully removed' })
    } catch (error) {
      response.status(500).json({ msg: 'Internal server error' })
    }
  }
}
