import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb'
}

const conection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const lower = genre.toLowerCase()
      const [genres] = await conection.query(
        'Select id,name from genre where Lower(name) = ?', [lower]
      )
      if (genres.length === 0) return []
      const [{ id }] = genres

      const [movieGenre] = await conection.query(
        ' SELECT title, year, director, duration, poster, rate FROM movie INNER JOIN movie_genre ON movie.id = movie_genre.movie_id INNER JOIN genre ON movie_genre.genre_id = ? GROUP BY movie.id;',
        [id]
      )

      return [movieGenre]
    }
    const [movies] = await conection.query(
      '  select title, year, director, duration,poster,rate, bin_to_UUID(id) id from movie ;'
    )
    return movies
  }

  static async getId({ id }) {
    const [movies] = await conection.query(
      '  select title, year, director, duration,poster,rate, bin_to_UUID(id) id from  movie where id = UUID_TO_BIN(?);',
      [id]
    )
    if (movies.length === 0) return null
    return movies[0]
  }

  static async create({ input, id }) {
    const {
      title,
      year,
      director,
      duration,
      poster,
      rate
    } = input

    const [uuidResult] = await conection.query('select UUID() uuid;')
    const [{ uuid }] = uuidResult

    await conection.query(
      'insert into movie (id,title,year,director,duration,poster,rate) values (UUID_TO_BIN(?),?,?,?,?,?,?)',
      [uuid, title, year, director, duration, poster, rate]
    )
    const [movies] = await conection.query(
      ' select title, year, director, duration,poster,rate, bin_to_UUID(id) id from  movie where id = uuid_to_bin(?);',
      [uuid]
    )
    return movies[0]
  }

  static async update({ input, id }) {
    const {
      title,
      year,
      director,
      duration,
      poster,
      rate
    } = input

    const [uuidResult] = await conection.query('select UUID() uuid;')
    const [{ uuid }] = uuidResult

    await conection.query(
      // eslint-disable-next-line quotes
      "update movie set id = UUID_TO_BIN(?), title = '?', year = ?,director = '?', duration = ?,poster = '?',rate = ? where id = uuid_to_bin(?)",
      [uuid, title, year, director, duration, poster, rate, id]
    )
    const [movies] = await conection.query(
      ' select title, year, director, duration,poster,rate, bin_to_UUID(id) id from movie where id = uuid_to_bin(?);',
      [uuid]
    )
    return movies[0]
  }

  static async delete({ id }) {
    const [movies] = await conection.query(
      '  delete from movie where id = UUID_TO_BIN(?);',
      [id]
    )
    return movies
  }
}
