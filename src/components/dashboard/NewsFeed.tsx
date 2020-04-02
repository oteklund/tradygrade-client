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
            <header className="newsfeed-header">
                <h2 className="newsfeed-title">What's new?</h2>
                <div className="newsfeed-header-icons">
                    <i className="fa fa-sync-alt"></i>
                    <i className="fa fa-sliders-h"></i>
                    <i className="fa fa-cogs"></i>
                </div>
            </header>
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
