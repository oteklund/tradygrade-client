import React from 'react'

interface Props {

}

const NewsFeedPost = (props: Props) => {
    return (
        <div className="newsfeed-post-container">
            <div className="newsfeed-grid-header">
                <h4 className="newsfeed-header">Green values are radical, world leader says</h4>
                <span className="newsfeed-subtitle">written by: Göran Österholm / Druids of Finland</span>
            </div>
            <div className="newsfeed-share">
                <i className='fa fa-facebook'></i>
                <i className="fa fa-twitter"></i>
                <i className="fa fa-google"></i>
                <i className="fa fa-reddit"></i>
                <i className="fa fa-instagram"></i>
                <i className="fa fa-pinterest"></i>
            </div>
            <article>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam laboriosam maxime, odio rerum qui atque veniam aspernatur iure optio non! Nostrum sed fugiat possimus tenetur similique. Temporibus soluta voluptatibus ratione id molestias! Quis assumenda officia quisquam nesciunt odit, iste, deserunt ut veniam, enim doloribus nisi commodi animi error distinctio debitis.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi culpa, facere deserunt blanditiis saepe laboriosam quis ducimus voluptate nisi sapiente dicta quibusdam non esse, quam officiis voluptatem officia aliquid fugiat?</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque itaque tenetur tempora maiores a veritatis nesciunt vel, repellat, unde, assumenda ipsum nostrum voluptatibus dignissimos explicabo. Aperiam excepturi a minima necessitatibus odit sed, dolore quae omnis enim expedita incidunt nobis molestias ex neque. Dicta laboriosam, laudantium ullam blanditiis harum nulla repellat?</p>
            </article>
            <aside>
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum neque deleniti totam veritatis ratione suscipit quae minima illo odit quis?"
            </aside>
            <img src="https://cdn.pixabay.com/photo/2020/03/30/12/54/triberg-4984171_960_720.jpg" alt="a beautiful forest landscape"></img>
        </div>
    )
}

export default NewsFeedPost
