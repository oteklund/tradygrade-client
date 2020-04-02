/*
This component displays the news feed in the dashboard. Users' news feeds are personalized according to their interests.
*/
import "./NewsFeed.scss"
import React from 'react'
import NewsFeedPost from './NewsFeedPost'

interface Props {
    
}

const NewsFeed = (props: Props) => {
    return (
        <div className="newsfeed-container">
            <h2 className="newsfeed-title">What's new?</h2>
            <div className="newsfeed-content">
            <NewsFeedPost />
            <NewsFeedPost />
            <NewsFeedPost />
            <NewsFeedPost />
            </div>
        </div>
    )
}

export default NewsFeed
