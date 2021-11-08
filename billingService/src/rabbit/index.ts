import amqplib from 'amqplib';
import dotenv from 'dotenv';
import once from 'lodash.once';

dotenv.config();

let amqplibInstance: MessageBroker | null = null;

class MessageBroker {
    public queues: Record<string, Function[]>;
    public connection: amqplib.Connection | null = null;
    public channel: amqplib.Channel | null = null;

    constructor() {
        this.queues = {};
    }

    async init() {
        this.connection = await amqplib.connect(process.env.AMQPLIB_CONNECTION_URL as string);
        this.channel = await this.connection.createChannel();
        return this;
    }

    async send(queue: string, message: Buffer) {
        if (!this.connection) {
            await this.init();
        }

        if (this.channel) {
            await this.channel.assertQueue(queue, { durable: true });
            this.channel.sendToQueue(queue, message);
        }        
    }

    async subscribe(queue: string, handler: Function) {
        if (!this.connection) {
            await this.init();      
        }

        if (this.queues[queue]) {
            console.log({ queue })
            const existinghandler = this.queues[queue].find((cb) => cb === handler);

            if (existinghandler) {
                console.log({ existinghandler })
                return () => this.unsubscribe(queue, handler)
            }

            this.queues[queue].push(handler);
            console.log("Could not find handler: ", this.queues);

            return () => this.unsubscribe(queue, handler);
        }

        if (this.channel) {
            await this.channel.assertQueue(queue, { durable: true });
            this.queues[queue] = [handler];
            console.log("handler", handler)
            this.channel?.consume(
                queue,
                async (message) => {
                    console.log({ message });
                    if (message) {
                        const ack = once(() => this.channel?.ack(message));
                        this.queues[queue].forEach(h => h(message, ack))
                    }                    
                }
            );

            return () => this.unsubscribe(queue, handler);
        }
    }

    async unsubscribe(queue: string, handler: Function) {
        const index = this.queues[queue].findIndex((handle) => handler === handle);

        if (index >= 0) {
            this.queues[queue].splice(index, 1);
        }
    }

    public static async getInstance() {
        if (!amqplibInstance) {
            const broker = new MessageBroker();
            amqplibInstance = await broker.init()
        }
        
        return amqplibInstance;
    }
}

export default MessageBroker;