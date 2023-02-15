import Env from '@ioc:Adonis/Core/Env'

export default class DatabaseAdapter {
  public static parseCountObject(queryResult: object) {
    let index = ''

    switch (Env.get('DB_CONNECTION')) {
      case 'pg':
        index = 'count'
        break
      case 'mysql':
        index = 'count(*)'
        break
      default:
        throw new Error('INVALID DATABASE REFERENCE - INTERNAL SERVER ERROR')
    }

    return parseInt(queryResult[0][`${index}`])
  }
}
