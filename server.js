const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Schema = mongoose.Schema;
const server = express();
server.use(express.json());
server.use(cors());

mongoose.connect('mongodb+srv://rolandc5:maxx2006@cluster0.xqsv9bq.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connected!'));

const ItemSchema = new Schema(
  {
    name: String,
    url: String,
    image: String,
    description: String,
    price: String,
    bought: Boolean
  }
)

const Item = mongoose.model('ItemSchema', ItemSchema);

server.get('/', (req, res) => {
  res.send('this is a server');
});

server.post('/create', async(req, res)  => {
  try {
    const body = req.body;
    const item = new Item();
    item.name = body.name;
    item.url = body.url;
    item.image = body.image;
    item.description = body.description;
    item.price = body.price;
    item.bought = body.bought;
    const saved = await item.save()
    res.status(200).send(saved);
  }
  catch (err) {
    res.status(400).send('error')
  }
})

server.get('/getList', async(req, res) => {
  try {
    const retrieved = await Item.find({});
    res.status(200).send(retrieved);
  } catch(err) {
    res.status(400).send('error');
  }
})

server.put('/updateList', async(req, res) => {
  try {
    const updated = req.body;
    const item = Item.findOneById(updated.id);
    item.bought = updated.bought;
    const saved = item.save();
    res.status(200).send(saved);
  } catch(err) {
    res.status(400).send('error');
  }
})

server.listen(3030, () => {
  console.log('server is running on port 3030');
});
