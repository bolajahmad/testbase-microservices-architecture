const amqplib = require('amqplib');
const once = require('lodash.once');
require('dotenv').config();

/**
 * @var {Promise<MessageBroker>}
 */
let amqpInstance = null;

class MessageBroker {
    constructor() {
        this.queues = {};
    }

    async init() {
        this.connection = await amqplib.connect(process.env.AMPQ_CONNECTION_URL + '?heartbeat=60')
        this.channel = await this.connection.createChannel();
        // console.log({ connection: this.connection, channel: this.channel })
        return this;
    }
    
    async send(queue, message) {
        if (!this.connection) {
            await init();
        }

        await this.channel.assertQueue(queue, { durable: true });
        this.channel.sendToQueue(queue, message)
    }

    async subscribe(queue, handler) {
        if (!this.connection) {
            await this.init();
        }

        if (this.queues[queue]) {
            const existingHandler = this.queues[queue].find((hand) => hand === handler);

            if (existingHandler) {
                return () => this.unsubscribe(queue, existingHandler);
            }

            this.queues[queue].push(handler);
            return () => this.unsubscribe(queue, handler)
        }

        await this.channel.assertQueue(queue, { durable: true });
        this.queues[queue] = [handler];

        this.channel.consume(
            queue,
            async (msg) => {
                const ack = once(() => this.channel.ack(msg));
                this.queues[queue].forEach(h => h(msg, ack));
            }
        );

        return this.unsubscribe(queue, handler);
    }

    async unsubscribe(queue, handler) {
        const existingHandler = this.queues[queue].findIndex((hand) => hand === handler);
        this.queues[queue].splice(existingHandler, 1);
    }
}

MessageBroker.getInstance = async function () {
    if (!amqpInstance) {
        const mb = new MessageBroker();
        amqpInstance = await mb.init();
    }

    return amqpInstance;
}

module.exports = MessageBroker;