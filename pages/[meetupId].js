import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../components/meetups/MeetupDetail';

const MeetupDetails = props => {
  return (
    <>
      <Head>
          <title>{props.meetupData.title}</title>
          <meta name='description' content={props.meetupData.description}/>
      </Head>
      <MeetupDetail {...props.meetupData} />
    </>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect('mongodb+srv://amlan:amlan@cluster0.sguj2iz.mongodb.net/myDB?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetupIds = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    paths: meetupIds.map(meetupIdData => ({ params: { meetupId: meetupIdData._id.toString() }})),
    fallback: false
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect('mongodb+srv://amlan:amlan@cluster0.sguj2iz.mongodb.net/myDB?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});
  client.close();
  console.log(selectedMeetup);
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description
      }
    }
  };
};

export default MeetupDetails;