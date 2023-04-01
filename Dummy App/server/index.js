const express = require("express")
require("dotenv").config()
const app = express()
const { Client } = require('@elastic/elasticsearch')
const { startCronJob } = require("./services/cronjob.service")
const fs = require("fs")
const { searchOpenAPI } = require("./services/search.service")
const cors = require("cors")
app.use(cors())
const client = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD,
  },
  auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD 
  }
})

client.ping().then(res => {
  console.log("DB connected successfully!")
})
.catch(e => {
  console.log("Failed to connect!",e)
})


// startCronJob(client)


app.get("/",(req,res) => {
  res.json({
    "msg": "It's working"
  })
})

app.get('/search', async (req, res) => {
  try {
   const response = await searchOpenAPI(client,req.query.q);
   res.json(response)
  }
  catch(e) {
    console.log(e)
  }
})

const port = 8081
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})