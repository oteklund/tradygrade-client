/*
This component allows the user to write and send chat messages.
*/
import React from 'react'

interface Props {
    // message: String
}

const ComposeMessage = (props: Props) => {
    return (
        <div className="ComposeMessage">
            <textarea></textarea>
        </div>
    )
}

export default ComposeMessage
