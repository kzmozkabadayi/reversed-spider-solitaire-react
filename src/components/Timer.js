import React from 'react';
import "../../src/style/Timer.scss";


const Timer = ({minSecs}) => {
   
    const { minutes = 0, seconds = 0 } = minSecs;
    const [[ mins, secs], setTime] = React.useState([minutes, seconds]);
    

    const tick = () => {
   
        if ( mins === 99 && secs === 59) 
        reset()
         else if (secs === 59) {
            setTime([ mins + 1, 0]);
        } else {
            setTime([mins, secs + 1]);
        }
    };


    const reset = () => setTime([parseInt(minutes), parseInt(seconds)]);

    
    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    
    return (
        <div className="timer-part">
            <p>{mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}</p> 
        </div>
    );
}

export default Timer;