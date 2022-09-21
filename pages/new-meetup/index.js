
import React from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import { useRouter } from 'next/router';
import Head from 'next/head'
import { Fragment } from 'react'

const NewMeetupPage = () => {
    const router = useRouter()

    async function addMeetupHandler(enteredMeetupData) {
        const response = await fetch('/api/new-meetup', {
            method: "POST",
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();
        router.push('/')
        console.log(data)
    }

    return <Fragment>
    <Head>
        <title>Add new meetup</title>
        <meta name="description" content='Create a new meetup and join the new opportunity'></meta>
    </Head>
    <NewMeetupForm onAddMeetup={addMeetupHandler} />
</Fragment>
    
    
    

}

export default NewMeetupPage;
