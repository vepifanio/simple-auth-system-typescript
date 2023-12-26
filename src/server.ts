import { app } from './app'

const PORT = 3333

app.listen(
  {
    port: PORT,
  },
  (err) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }

    console.log(`Server is running on port ${PORT}`)
  },
)
