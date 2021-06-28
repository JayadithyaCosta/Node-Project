const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {

    MongoClient.connect('mongodb+srv://jay:jay@96@cluster0.8hyoh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected!');
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err)
        throw err;
    });

};

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No Database Found!'
};


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;