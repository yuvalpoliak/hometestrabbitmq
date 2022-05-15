var mongoClient = require('mongodb').MongoClient;
var url :string = 'mongodb://localhost:27017/';

export interface keyValue{
    key: number,
    value: number
}
export const data: Array<keyValue> = [];

for (let i = 0; i<10000; i++){
    data.push(
        {key: i, value: i}
    )
}

mongoClient.connect(url, (err: Error, db: any) => {
    if (err) throw err;
    var dbo = db.db('mydb');
    dbo.collection('assignment').insertMany(data, (err: Error, res: any) => {
        if(err) throw err;
        console.log('number of docs inserted' + res.insertedCount)
    })
})