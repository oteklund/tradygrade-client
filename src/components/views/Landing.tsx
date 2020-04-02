/*
This component is displayed when the user first visits the website. Subsequent visits (if user logged in) are redirected to Main. Logged out users are redirected here.
*/
import React from 'react';
import LogIn from '../landing/LogIn';
import Register from '../landing/Register';
import "./Landing.scss"
interface Props { }

const Landing = (props: Props) => {
  return (
    <div className="landing-background">
      <div
        className="landing-container"
      >
        <header>
          <p id="slogan">There's no greater trade than tradygrade</p>
          <p id="about">Tradygrade helps you make use of your unwanted items, make new friends, and save the planet at the same time. Sign up now for free and join our ever-growing community of generally nice people™</p>
          <LogIn />
          <Register />
        </header>
        <div className="notice">
          <h5>Breaking news</h5>
          <p>News is broken. Someone went ahead and broke the news. We at tradygrade cannot believe they've done this. We pledge to get to the bottom of this at our earliest convenience. On behalf of all of Tradygrade, we sincerely apologize for any inconvenience this has caused. Our hearts go out to the news families and loved ones.</p>
          <br />
          <span className="signature"><b>The Tradygrade Crew</b></span>
        </div>
        <h1 id="landing-title">tradygrade</h1>
      </div >
    </div>
  );
};

export default Landing;
