const express = require('express')
const ejs = require('ejs')
const path = require('path')
const parser = require('co-body')
const { v4: uuid } = require('uuid')
const cors = require('cors')

const PORT = process.env.PORT || 8000
const app = express()
const formData = []

app.use(express.static(path.join(__dirname , '/static/css')))
app.use(express.static(path.join(__dirname , '/static/js')))
app.use(cors())

app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

// GET
app.get('/', (req, res) => {
  res.render('home.html', {formData})
})

// POST
app.post('/', async (req, res) => {
  const { todoContent } = await parser.form(req)

  formData.push({
    todoContent: todoContent,
    id: uuid(),
    removed: false
  })

  res.redirect('/')
})

app.delete('/', async (req, res) => {
  const { id = 0 } = await parser.json(req)

  // const itemIndex = formData.findIndex(el => {
  //   return (el.id === id)
  // })

  formData.forEach(element => {
    if (element.id === id) {
      element.removed = true
    }
  });

})

app.listen(PORT, console.log(`Server runnning at http://localhost:${PORT}`))
