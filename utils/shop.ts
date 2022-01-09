// import monogodb from 'mongodb';
import { MongoClient } from 'mongodb';

let cachedDb: any = null;

const connectionString = process.env.DB_CONNECTION_STRING;

// declare client
const client = new MongoClient(connectionString);
// connect to database
const promise = client.connect()


export class Shop {
    db: string = 'shop';
    async getProducts() {
        await promise;
        // get database
        const db = client.db(this.db);
        // get collection
        const collection = db.collection('products');
        // get all products with callback
        const products = await collection.find({}).toArray();
        return products;

    }


    async searchProducts(searchTerm) {
        await promise;
        // get database
        const db = client.db(this.db);
        // get collection
        const collection = db.collection('products');
        // get all products with callback
        const products = await collection.find({
            $text: {
                $search: searchTerm
            }
        }).toArray();
        return products;
    }

    async getProduct(id) {
        await promise;
        // get database
        const db = client.db(this.db);
        // get collection
        const collection = db.collection('products');
        // get all products with callback
        const product = await collection.find({ _id: id });
        const productArray = await product.toArray();
        return productArray[0];
    }

    async editProduct(id, change_object) {
        await promise;
        // get database
        const db = client.db(this.db);
        // get collection
        const collection = db.collection('products');
        console.log(change_object)
        // update product
        const product = await collection.updateOne(
            { _id: id },
            {
                $set: change_object
            }
        )
        return product;
    }

    async addProduct(id, name, price, stock, image_url, author, description) {
        await promise;
        // get database
        const db = client.db(this.db);
        // get collection
        const collection = db.collection('products');
        // add product
        const product = await collection.insertOne({
            _id: id,
            name: name,
            price: price,
            stock: stock,
            image: image_url,
            author: author,
            description: description
        })

        return product;
    }
}