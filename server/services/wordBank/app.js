if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require("express")
const app = express()
const port = process.env.PORT || 4001
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
