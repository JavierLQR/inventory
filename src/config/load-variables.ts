export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  database: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  NODE_ENV: process.env.NODE_ENV,
  SECRET: process.env.SECRET,
})
