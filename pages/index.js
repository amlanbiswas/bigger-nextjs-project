import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = props => {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name='description' content='Browse a huge list of highly active React meetups!'/>
            </Head>
            <MeetupList {...props} />;
        </>
    );
};

// export const getServerSideProps = async (context) => {
//     const { req, res } = context;
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// };

export const getStaticProps = async () => {
    const client = await MongoClient.connect('mongodb+srv://amlan:amlan@cluster0.sguj2iz.mongodb.net/myDB?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const queriedMeetups = await meetupsCollection.find().toArray();
    client.close();
    return {
        props: {
            meetups: queriedMeetups.map(meetup => ({
                id: meetup._id.toString(),
                title: meetup.title,
                image: meetup.image,
                address: meetup.address
            }))
        },
        revalidate: 60
    };
};

export default HomePage;