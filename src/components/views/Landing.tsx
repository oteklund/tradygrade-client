/*
This component is displayed when the user first visits the website. Subsequent visits (if user logged in) are redirected to Main. Logged out users are redirected here.
*/
import React from 'react';
import LogIn from '../landing/LogIn';
import Register from '../landing/Register';
import "./Landing.scss"
interface Props {}

const Landing = (props: Props) => {
  return (
    <div
    className="landing-container"
    >
      <LogIn />
      <h1 id="landing-title">tradygrade</h1>
      <Register />
    </div>
  );
};

export default Landing;
