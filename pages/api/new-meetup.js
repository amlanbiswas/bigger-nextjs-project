import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
    console.log('Hello');
    if(req.method==='POST'){
        console.log('Hello');
        const { title, image, address, description } = req.body;
        const client = await MongoClient.connect('mongodb+srv://amlan:amlan@cluster0.sguj2iz.mongodb.net/myDB?retryWrites=true&w=majority');
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(req.body);
        console.log(result);
        client.close();
        res.status(201).json({ message: 'Meetup inserted!' });
    }
};

export default handler;