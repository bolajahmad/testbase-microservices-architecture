import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDB } from './src/config';
require('dotenv').config();

// import routes
import router from './src/routes';
import MessageBroker from './src/messaging';
import { EmailUtils } from './src/utils';
import { IEmailConfig } from './src/models';

const app = express();

// use middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use('/api', router);

MessageBroker.getInstance().then((broker) => {
  broker.subscribe('email-queue', (message: any, ack: any) => {
    const emailData = JSON.parse(message.content.toString()) as IEmailConfig
    EmailUtils.send(emailData)
    ack?.();
  })
}).catch((error) => console.log({ error }));

app.get("/", (req, res) => {
    res.send(`<h1>Welcome to the ExquisApp Testbase Email service <br> part of the Moneypal Application</h1>
      <h4>Please use PostMan and navigate to <code>/api/v1</code> to use the app</h4>
      <h4>Thanks  &#x1F600;</h4>`);
});

connectDB();

//routes
app.listen(process.env.PORT, () =>
  console.log(`server running on port ${process.env.PORT}`)
);

module.exports = app;