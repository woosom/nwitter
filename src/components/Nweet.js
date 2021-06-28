import { dbService, storageService } from 'fbase'
import React, { useState } from 'react'

export const Nweet = ({ nweet, isOwner }) => {
    const [editing, setEditing] = useState(false)
    const [newNweet, setNewNweet] = useState(nweet.text)

    const onDelete = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?")
        if (ok) {
            await dbService.doc(`nweets/${nweet.id}`).delete()
            await storageService.refFromURL(nweet.attachmentUrl).delete()
        }
    }

    const onEdit = () => {
        setEditing((prev) => !prev)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        dbService.doc(`nweets/${nweet.id}`).update({
            text: newNweet
        })
        setEditing(false)
    }

    const onChange = (event) => {
        const {
            target: { value }
        } = event
        setNewNweet(value)
    }

    const onCancel = () => {
        setEditing(false)
    }

    return (
        <div>
            {
                editing ?
                    <>
                        <form onSubmit={onSubmit}>
                            <input type="text" onChange={onChange} value={newNweet} />
                            <input type="submit" value="Update Nweet" />
                        </form>
                        <button onClick={onCancel}>Cancel</button>
                    </>
                    : <></>
            }
            <h4>{nweet.text}</h4>
            {nweet.attachmentUrl && <img src={nweet.attachmentUrl} width="50px" height="50px" />}
                {isOwner &&
                    <>
                        <button onClick={onDelete}>Delete Nweet</button>
                        <button onClick={onEdit}>Edit Nweet</button>
                    </>
                }
        </div>
    )
}
