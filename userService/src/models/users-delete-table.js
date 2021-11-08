const AWS = require("aws-sdk");
// Customization 1: choose your region
const DynamoDb = new AWS.DynamoDB.DocumentClient({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});
const tableName = "UsersTable";

// Customization 3: specify the hash key for your table
const hashKey = "username";

// Customization 4: if your table has a range key, specify it here. If your table does not have a range key
// set the value below to null
const rangeKey = null;

async function getAllItemsFromTable(lastEvaluatedKey) {
    const res = await DynamoDb.scan({
        TableName: tableName,
        ExclusiveStartKey: lastEvaluatedKey
    }).promise();
    return { items: res.Items, lastEvaluatedKey: res.LastEvaluatedKey };
}

const deleteAllItemsFromTable = async function (items) {
    var numItemsDeleted = 0;
    // Split items into patches of 25
    // 25 items is max for batchWrite
    await asyncForEach(split(items, 25), async (patch, i) => {
        const requestItems = {
            [tableName]: patch.map(item => {
                numItemsDeleted++;
                const Key = {
                    [hashKey]: item[hashKey]
                };
                
                return {
                    DeleteRequest: {
                        Key
                    }
                };
            })
        };
        console.log({ requestItems })
        if (requestItems[tableName].length > 0) {
            await DynamoDb.batchWrite({ RequestItems: requestItems }).promise();
            console.log(`finished deleting ${numItemsDeleted} items this batch`);
        }
    });

    return { numItemsDeleted };
};

function split(arr, n) {
  var res = [];
  while (arr.length) {
    res.push(arr.splice(0, n));
  }
  return res;
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function letsGo() {
  let lastEvaluatedKey;
  let totalItemsFetched = 0;
  let totalItemsDeleted = 0;

  console.log(`------ Deleting from table ${tableName}`);

  do {
    const { items, lastEvaluatedKey: lek } = await getAllItemsFromTable(
      lastEvaluatedKey
    );
    totalItemsFetched += items.length;
    console.log(`--- a group of ${items.length} was fetched`);

    const { numItemsDeleted } = await deleteAllItemsFromTable(items);
    totalItemsDeleted += numItemsDeleted;
    console.log(`--- ${numItemsDeleted} items deleted`);

    lastEvaluatedKey = lek;
  } while (!!lastEvaluatedKey);

  console.log("Done!");
  console.log(`${totalItemsFetched} items total fetched`);
  console.log(`${totalItemsDeleted} items total deleted`);
}

letsGo();
