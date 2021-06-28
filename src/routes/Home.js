import React, { useEffect } from 'react'
import { useState } from 'react'
import { dbService } from 'fbase'
import { Nweet } from 'components/Nweet'
import NweetFactory from 'components/NweetFactory'

export const Home = ({ userObj }) => {

    const [nweets, setNweets] = useState([])

    useEffect(() => {
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((item) => {
                return {
                    id: item.id,
                    ...item.data()
                }
            })
            setNweets(nweetArray)
        })
    }, [])


    return (
        <div>
            <NweetFactory userObj={userObj} />
            <div>
                {
                    nweets.map(item => (
                        <Nweet
                            key={item.id}
                            nweet={item}
                            isOwner={item.creatorId === userObj.uid}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Home;