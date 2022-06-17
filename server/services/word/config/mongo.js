const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

let db;
async function connection() {
  try {
    await client.connect();
    db = client.db("waruta-db");
  } catch (err) {
    console.log(err);
  }
}

function getDb() {
  return db;
}

module.exports = {
  connection,
  getDb,
};
