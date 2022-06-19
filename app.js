const express = require('express')
const app = express()
const mongoose = require('mongoose')

//custom date import
const getDate = require('./date')
const getDay = require('./date')
console.log(getDate.getDate())

app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs')

// const date = require('./date')
// let items = ['buy food', 'cook food', 'eat food']

mongoose.connect("mongodb+srv://angela-todo:test123@cluster0.drlit.mongodb.net/todolistDB", () => {
  console.log("connected to the database...")
})

const itemSchema = new mongoose.Schema({
  name: String
})

const Item = mongoose.model("Item", itemSchema)

const item1 = Item({
  name: "Welcome to your todolist!"
})
const item2 = Item({
  name: "Hit the + button to add a new item"
})
const item3 = Item({
  name: "<-- Hit this to delete an item"
})
const defaultItems = [item1, item2, item3]




app.get('/', (req, res) => {

  Item.find({}, (err, foundItems) => {
    // console.log(foundItems.length)
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, (err) => {
        if (!err) {
          // console.log("default item entered..")
        }
      })
      res.redirect("/")
    } else {
      res.render('list', { listTitle: getDate.getDate(), newListItems: foundItems })
    }
  })

})

app.post('/delete', (req, res) => {
  // console.log(req.body.checkbox)
  removeItemId = req.body.checkbox
  Item.findOneAndRemove({ _id: removeItemId }, (err, result) => {
    if (!err) {
      // console.log("item successfully removed...")
      res.redirect('/')
    }
  })
  // Item.deleteOne({name:})
})

app.post('/', (req, res) => {
  const newItem = req.body.newItem
  if (newItem.trim().length > 0) {
    const item = new Item({
      name: newItem
    })
    item.save()
  }

  res.redirect('/')
})

app.get('/about', (req, res) => {
  res.render('about')
})

let port = process.env.port
if (port == null || port == "") {
  port = 3000
}
app.listen(port, () => {
  console.log("server started on port 3000")
})