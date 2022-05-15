const ampq = require('amqplib');
import { rabbitConfig } from "./configFile";

async function connect() : Promise<void> {

    interface keyPair{
        integers: string,
        sum: number
    }

    const queue: string = 'numbers'
    let arr: Array<keyPair> =[];

    try{
        const connection = await ampq.connect(rabbitConfig);
        console.log('there is a connection')

        const channel = await connection.createChannel();
        console.log('channel created')

        await channel.assertQueue(queue)
        console.log('created the employees queue')

        channel.consume(queue, (nums: any) => {
            try{
            let number = JSON.parse(nums.content)
            for(let i: number =0; i<number.length; i+2){
                arr.push(
                    {integers: `${number[i].key}, ${number[i+1].key}` , sum: number[i].value + number[i+1].value}
                )
            }
        }
        catch(err){
            console.log(err)
        }
        })
    }
    catch(err){
        console.log(err)
    }
}

connect();