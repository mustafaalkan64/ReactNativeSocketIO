

const database = require('@models/database.js');


const users = {

    async getAll() {
        const dbo = await database.getDbo();

        return await dbo.collection('users').find().toArray();
    },

    async search(good) {
        const dbo = await database.getDbo();

        const {_id} = good;

        return await dbo.collection('users').find({_id: new ObjectId(_id)}).toArray();
    },

    async create(good) {
        const dbo = await database.getDbo();
        
        delete good._id;
        delete good.id;
        
        await dbo.collection('users').insertOne(good);
    },

    async update(good) {
        const dbo = await database.getDbo();

        const {_id} = good;
        
        delete good._id;
        delete good.id;

        await dbo.collection('users').updateOne({_id:  new ObjectId(_id)},{$set: good});
    },

    async delete(good) {
        const dbo = await database.getDbo();

        const {_id} = good;
        
        await dbo.collection('users').deleteOne({_id: new ObjectId(_id)});
    }

}


module.exports = users;