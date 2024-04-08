import express, { json } from 'express'
import { routerMovies } from './routes/rMovies.js'

const app = express()
app.use(json())
app.disable('x-powered-by')

app.use('/movies', routerMovies)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening in port http://localhost:${PORT}`)
})
