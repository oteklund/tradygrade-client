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
                    <span className="fa fa-sync-alt"></span>
                    <span className="fa fa-sliders-h"></span>
                    <span className="fa fa-cogs"></span>
                </div>
            </header>
            <div className="newsfeed-content">
                <NewsFeedPost author="Göran Österholm / Druids of Finland" title="" image="https://cdn.pixabay.com/photo/2020/03/30/12/54/triberg-4984171_960_720.jpg" />
                <NewsFeedPost author="Denise Whittaker" title="Of Cherry Blossoms and Exclusive Ales" image="https://cdn.pixabay.com/photo/2020/03/30/15/57/spring-4984628_960_720.jpg" />
                <NewsFeedPost author="Boris Hanson / Recycle:now Magazine" title="Who benefits from recycling, really?" image="https://cdn.pixabay.com/photo/2017/11/19/23/25/forest-2964073_960_720.jpg"/>
                <NewsFeedPost author="Harry Bishop" title="I Wish I had had a Pony When I was a Kid" image="https://cdn.pixabay.com/photo/2020/03/24/11/21/thunder-4963719_960_720.jpg"/>
            </div>
        </div>
    )
}

export default NewsFeed
