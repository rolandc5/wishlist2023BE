const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv")
dotenv.config()
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors({origin: true}));

const { Schema } = mongoose;

const url = process.env.MONGO_URI;

const mongooseConnect = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to Mongo DB");
  } catch (err) {
    console.log(err);
  }
}

mongooseConnect();

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

app.get('/', (req, res) => {
  res.send('this is a server');
});

app.post('/create', async (req, res) => {
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

app.get('/getList', async (req, res) => {
  try {
    const retrieved = await Item.find({});
    res.status(200).send(retrieved);
  } catch (err) {
    res.status(400).send('error');
  }
})

app.put('/updateList', async (req, res) => {
  try {
    const updated = req.body;
    const item = await Item.findById(updated.id);
    item.bought = updated.bought;
    const saved = await item.save();
    res.status(200).send(saved);
  } catch (err) {
    console.log(err);
    res.status(400).send('error');
  }
})

app.listen(port, () => {
  console.log('server is running on port 8080');
});
