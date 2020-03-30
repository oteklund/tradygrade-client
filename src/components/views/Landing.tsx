/*
This component is displayed when the user first visits the website. Subsequent visits (if user logged in) are redirected to Main. Logged out users are redirected here.
*/
import React from 'react';
import LogIn from '../landing/LogIn';
import Register from '../landing/Register';
interface Props {}

const Landing = (props: Props) => {
  return (
    <>
      <LogIn />
      <br />
      <Register />
    </>
  );
};

export default Landing;
