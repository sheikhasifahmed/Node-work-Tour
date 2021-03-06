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

    app.get("/place-order/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      // const serviceName = req.params.serviceName;
      // const query = { service: serviceName };
      const result = await packageCollection.findOne(query);

      res.send(result);
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

async function order() {
  try {
    await client.connect();
    const database = client.db("tour");
    const bookingsCollection = database.collection("bookings");
    // create a document to insert

    app.post("/place-order", async (req, res) => {
      const booking = req.body;
      const result = await bookingsCollection.insertOne(booking);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      res.json(booking);
    });

    app.get("/bookings", async (req, res) => {
      const cursor = bookingsCollection.find({});
      const packages = await cursor.toArray();
      res.send(packages);
    });

    app.get("/my-bookings/:user", async (req, res) => {
      const user = req.params.user;
      console.log(user);
      const query = { userEmail: user };
      console.log(query);
      const cursor = bookingsCollection.find(query);
      // console.log(cursor);
      const bookings = await cursor.toArray();
      console.log(bookings);
      res.send(bookings);
    });

    app.put("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const update = req.body;
      console.log(update);
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: { status: update.status },
      };
      const result = await bookingsCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      console.log(result);
      res.json(result);
    });

    app.delete("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await bookingsCollection.deleteOne(query);
      console.log(result);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
order().catch(console.dir);

async function rate() {
  try {
    await client.connect();
    const database = client.db("tour");
    const ratingsCollection = database.collection("ratings");
    // create a document to insert

    app.post("/rating", async (req, res) => {
      const rating = req.body;
      const result = await ratingsCollection.insertOne(rating);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      res.json(rating);
    });

    app.get("/rating/:user", async (req, res) => {
      const user = req.params.user;
      console.log(user);
      const query = { userEmail: user };
      const cursor = ratingsCollection.find(query);
      const rating = await cursor.toArray();
      res.send(rating);
    });

    // app.get("/my-bookings/:user", async (req, res) => {
    //   const user = req.params.user;
    //   console.log(user);
    //   const query = { userEmail: user };
    //   console.log(query);
    //   const cursor = bookingsCollection.find(query);
    //   // console.log(cursor);
    //   const bookings = await cursor.toArray();
    //   console.log(bookings);
    //   res.send(bookings);
    // });

    // app.put("/bookings/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const update = req.body;
    //   console.log(update);
    //   const filter = { _id: ObjectId(id) };
    //   const options = { upsert: true };
    //   const updateDoc = {
    //     $set: { status: update.status },
    //   };
    //   const result = await bookingsCollection.updateOne(
    //     filter,
    //     updateDoc,
    //     options
    //   );
    //   console.log(result);
    //   res.json(result);
    // });

    // app.delete("/bookings/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await bookingsCollection.deleteOne(query);
    //   console.log(result);
    //   res.json(result);
    // });
  } finally {
    // await client.close();
  }
}
rate().catch(console.dir);

// user:AssignmentUser
// pass:2dGHzQ6jwI0rgWUP
