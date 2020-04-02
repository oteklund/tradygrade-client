/*
This component is rendered whenever a user tries to access a page that is not implemented.
*/
import React from 'react'
import './NotFound.scss'
import picture from "../../pictures/tradygradedarkblue.png";
import errorpicture from "../../pictures/error.png";
import errorpicture4 from "../../pictures/error4vol1.png";
import errorpicture0 from "../../pictures/error0.png";
import errorpicture4vol2 from "../../pictures/error4vol2.png";
interface Props {
    
}

const NotFound = (props: Props) => {
    return (
        <div className="error-faces">
            <img className="error-trady" src={picture} alt="tradygradedarkblue" />
            <img className="errormessage-trady" src={errorpicture} alt="ERROR!" />
            <img className="error4-trady" src={errorpicture4} alt="4" />
            <img className="error0-trady" src={errorpicture0} alt="0" />
            <img className="error4vol2-trady" src={errorpicture4vol2} alt="4!" />
     </div>
    )
}

export default NotFound;
