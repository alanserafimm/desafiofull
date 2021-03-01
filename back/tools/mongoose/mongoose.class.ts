import mongoose from 'mongoose';
import { config } from '../../config/config';

class MongoDb {

    init() {
        // Create the database connection 
        mongoose.connect(config.server.mongoDB, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }).catch(err => { console.log('Erro ao conectar no banco de dados.') });

        mongoose.set('useCreateIndex', true);

        // CONNECTION EVENTS
        // When successfully connected
        mongoose.connection.on('connected', () => {
            var conn: any = mongoose.connections[0]
            console.log(`Mongoose default connection open to: ${conn.host}:${conn.port} --> ${conn.name}`);
        });

        // If the connection throws an error
        mongoose.connection.on('error', (err: any) => {
            console.log('Mongoose default connection error: ' + err);
        });

        // When the connection is disconnected
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose default connection disconnected');
        });

        // If the Node process ends, close the Mongoose connection 
        process.on('SIGINT', () => {
            this.clearCache()
            mongoose.connection.close(function () {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(1);
            });
        });
    }

    getCollection(collectionName: string): mongoose.Collection {
        return mongoose.connection.collection(collectionName);
    }

    clearCache() {
        mongoose.connections.forEach((connection: any) => {
            const modelNames = Object.keys(connection.models)

            modelNames.forEach(modelName => {
                delete connection.models[modelName]
            })

            const collectionNames = Object.keys(connection.collections)
            collectionNames.forEach(collectionName => {
                delete connection.collections[collectionName]
            })
        })

        if (global.gc) { global.gc() }
        console.log('Cache released')

    }
}

export const mongoDB = new MongoDb();