import { authService, dbService } from 'fbase'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export const Profile = ( {userObj, refreshUser} ) => {
    const history = useHistory();
    const [myNweets, setMyNweets] = useState(null)
    const [displayName, setDisplayName] = useState(userObj.displayName)

    const onChange = (event) => {
        const {
            target: {
                value
            }
        } = event
        setDisplayName(value)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        if (userObj.displayName !== displayName) {
            await userObj.updateProfile({
                displayName: displayName
            })
        }
        refreshUser()
    }

    const onLogOutClick = () => {
        authService.signOut()
        history.push("/")
    }
    let getMyNweets = async () => {
        let myNweets = await dbService
        .collection("nweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdAt")
        .get()
        console.log("woosom")
        console.log(myNweets.docs.length)
        setMyNweets(myNweets.docs)
    }
    useEffect(() => {
        getMyNweets()
    }, [])
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Display name" value={displayName} onChange={onChange}/>
                <input type="submit" value="Update Profile" readOnly />
            </form>
            <h3>{ myNweets ? myNweets.length : 0} Post</h3>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}

export default Profile;