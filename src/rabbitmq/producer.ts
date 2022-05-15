const ampq = require('amqplib');
var mongoClient = require('mongodb').MongoClient;
var url : string = 'mongodb://localhost:27017/';
import { keyValue, data } from "../mongo/insertData";
import {rabbitConfig} from './configFile';

/*
there were two main components of the task that are not written explicitly in the code.
I'll explain why. 
Firstly Mongo is automatically dividing large amounts of data into batches of exactly 100.  
Secondly, if I understood the rabbitMQ docs correctly, the task queues are distributed automatically.
So, if I open two terminals for example, there will be two workers on the task. If three terminals,
then three workers and so on. Lastly, I thought it was too time consuming, but I Intend on finding a library
for types for rabbitmq(as there are special types for react and express for example).
*/


function connect(): void {
    const queue: string = 'numbers';
    mongoClient.connect(url, async (err: Error, db: any): Promise<void> =>{ 
    if (err) throw err;
    var dbo = db.db('mydb');
    dbo.collection('assignment').find({}).forEach((doc: keyValue) => {
        try{
        data.push(doc)
        console.log('data was retrieved')
        }
        catch {
            console.log('data was not retrieved')
        }
    })
        try{
        const connection = await ampq.connect(rabbitConfig);
        console.log('there is a connection')

        const channel = await connection.createChannel();
        console.log('channel created')

        await channel.assertQueue(queue)
        console.log('created the queue')

        for(let msg in data){
            await channel.sendToQueue(queue, Buffer.from(JSON.stringify(data[msg])))
            console.log(`message sent to queue - ${queue}`)
        }
    }
    catch(err){
        console.log(err)
    }
})
}
    
    

connect();

