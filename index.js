const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello Everyone to the assignment project");
});

app.listen(port, () => {
  console.log("listening to the port", port);
});

const ObjectId = require("mongodb").ObjectId;

const uri = `mongodb+srv://${process.env._DB_USER}:${process.env._DB_PASS}@cluster0.ig2yp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    await client.connect();
    const database = client.db("tour");
    const packageCollection = database.collection("servicePackage");
    // create a document to insert

    app.get("/services", async (req, res) => {
      const cursor = packageCollection.find({});
      const services = await cursor.toArray();
      res.send(services);
    });

    app.post("/add-package", async (req, res) => {
      const newService = req.body;
      const result = await packageCollection.insertOne(newService);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      res.json(newService);
      console.log(newService);
    });

    app.get("/service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      // const serviceName = req.params.serviceName;
      // const query = { service: serviceName };
      const result = await packageCollection.findOne(query);

      // res.send(result);
    });

    app.put("/service/:id", async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: { name: updatedUser.name, email: updatedUser.email },
      };
      const result = await packageCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.json(result);
    });

    app.delete("/service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await packageCollection.deleteOne(query);
      console.log(result);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// user:AssignmentUser
// pass:2dGHzQ6jwI0rgWUP
