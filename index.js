const express = require('express')
const ejs = require('ejs')
const path = require('path')
const parser = require('co-body')
const { v4: uuid } = require('uuid')
const cors = require('cors')

const PORT = process.env.PORT || 8000
const app = express()
let formData = []

app.use(express.static(path.join(__dirname , '/static/css')))
app.use(express.static(path.join(__dirname , '/static/js')))
app.use(cors())

app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

// GET
app.get('/', (req, res) => {
  res.render('home.html')
})

// POST
app.post('/', async (req, res) => {
  const form = await parser.form(req)

  formData.push(form)
  console.log(formData)

  res.redirect('/')
})



app.listen(PORT, console.log(`Server runnning at http://localhost:${PORT}`))
