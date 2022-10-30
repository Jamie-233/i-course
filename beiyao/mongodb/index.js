const { MongoClient } = require('mongodb');

const clientFunc = async (c) => {
    await client.connect();

    const db = client.db('mytest');
    return db.collection(c);
}

const client = new MongoClient('mongodb://127.0.0.1:27017');
const main = async () => {
    const cc = await clientFunc('cc')
    // const result = await cc.findOne({age: {$gt: 15}})
    // const result = await cc.updateOne({age: {$gt: 15}}, {$set: {username: 'jamie2345'}})
    const result = await cc.deleteOne({age: {$gt: 18}})
    // const result = await cc.insertOne({username: 'jamie233', age: 22})
    console.log(result)
    // console.log(await result.toArray());
};

main().finally(() => {
    client.close();
});
