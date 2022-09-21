import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb'
import Head from 'next/head'
import { Fragment } from 'react'


const HomePage = (props) => {
    return <Fragment>
                <Head>
                    <title>Dev meetup</title>
                    <meta name="description" content='Join the new meetup with Kishan about new tech'></meta>
                </Head>

                <MeetupList meetups={props.meetups} />

            </Fragment>
}

// export async function getServerSideProps(context){

//     const req = context.req;
//     const res = context.res;

//     // fetch data from API
//     return {
//         props: {
//             meetups: dummyMeetupData
//         }
//     }
// }

export async function getStaticProps() {
    // fetch data from API

    const client = await MongoClient.connect('mongodb+srv://kishan:idea1234@cluster0.6ikmu8u.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const meetups = await meetupCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 3600
    }
}

export default HomePage;
