const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000'
});

var dynamoDb = new AWS.DynamoDB();

var params = {
    TableName : "UsersTable",
    KeySchema: [       
        { AttributeName: "username", KeyType: "HASH" },  //Partition key
    ],
    AttributeDefinitions: [      
        { AttributeName: "username", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamoDb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

module.exports = dynamoDb;