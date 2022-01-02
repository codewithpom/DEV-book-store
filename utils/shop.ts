// import monogodb from 'mongodb';
import { MongoClient } from 'mongodb';

const connectionString = process.env.DB_CONNECTION_STRING;

// declare client
const client = new MongoClient(connectionString);
// connect to database
client.connect();


export class Shop {
    db: string = 'shop';
    async getProducts() {
        // get database
        const db = client.db(this.db);
        // get collection
        const collection = db.collection('products');
        // get all products with callback
        const products = await collection.find({}).toArray();
        return products;

    }

}