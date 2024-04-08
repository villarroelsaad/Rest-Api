import z from 'zod'

const movieSchema = z.object({
  title: z.string(),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(4),
  poster: z.string().url(),
  genre: z.enum(['Action', 'Drama', 'Sci-Fi', 'Adventure', 'Horror', 'Crime', 'Sci-Fi', 'Biography', 'Fantasy', 'Thriller', 'Romance', 'Mystery']).array()
})

export const validateMovie = function (object) {
  return movieSchema.safeParse(object)
}

export const validatePartialMovie = function (object) {
  return movieSchema.partial().safeParse(object)
}
