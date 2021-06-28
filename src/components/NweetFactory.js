import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from "uuid"
import { dbService, storageService } from 'fbase'

export const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("")
    const [attachment, setAttachment] = useState()

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = ""
        if (attachment) {
            let fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
            let response = await fileRef.putString(attachment, "data_url")
            let url = await response.ref.getDownloadURL()
            attachmentUrl = url
        }

        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl: attachmentUrl
        })
        setNweet("")
        setAttachment()
    }

    const onChange = (event) => {
        setNweet(event.target.value)
    }

    const onFileChanged = (event) => {
        const {
            target: {
                files
            }
        } = event

        if (files.length > 0) {
            const reader = new FileReader()
            reader.onloadend = (finishedEvent) => {
                const {
                    target: {
                        result
                    }
                } = finishedEvent
                setAttachment(result)
            }
            reader.readAsDataURL(files[0])
        }

    }

    const onClearPhoto = (event) => {
        setAttachment()
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="what's on your mind?" maxLength="120" value={nweet} onChange={onChange} />
                <input type="file" accept="image/*" onChange={onFileChanged} />
                <input type="Submit" value="Nweet" readOnly />
                {attachment ?
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearPhoto}>Clear Photo</button>
                    </div> : <></>}
            </form>
        </div>
    )
}

export default NweetFactory