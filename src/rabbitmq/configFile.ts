const ampq = require('amqplib');

//because its a home test its not in an env file. 
//Also, because its a home test i didnt use a library like crypto-js to encrypt the password.
interface configuration {
    protocol: string,
    hostname: string,
    port: number,
    username: string,
    password: string,
    vhost: string,
    authMechanism: Array<string>
}

const rabbitConfig: configuration = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672||15672,
    username: 'yuvalpoliak',
    password: '123456789',
    vhost: '/',
    authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL'] 
}

export { rabbitConfig };