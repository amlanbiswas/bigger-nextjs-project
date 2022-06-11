import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';

import NewMeetupForm from '../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
    const router = useRouter();
    const addMeetupHandler = async enteredMeetupData => {
        const response = await axios.post('/api/new-meetup', enteredMeetupData);
        console.log(response.data);
        router.replace('/');
    };
    return (
        <>
            <Head>
                <title>Add a New Meetup</title>
                <meta name='description' content='Add your own meetups and create amazing networking opportunities!'/>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>;
        </>
    );
};

export default NewMeetupPage;