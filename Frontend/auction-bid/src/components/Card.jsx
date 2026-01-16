import React, { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom'


export const Card = ({imgSrc,title,startingBid,startTime,endTime,id}) => {
  const calculateTimeLeft=()=>{
    const now=new Date();
    const startDifference=new Date(startTime)-now;
    const endDifference=new Date(endTime)-now;
    
    const timeLeft={}

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }
    return timeLeft;
  }  

  const [timeLeft,setTimeLeft] = useState(calculateTimeLeft())

    useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    });
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <div><Link to={`/auction/${id}`}>
      <img src={imgSrc} alt="" />
      <h2>{title}</h2>
      <p>{startingBid}</p>
      <p>{startTime}</p>
      <p>{endTime}</p>
      </Link></div>
  )
}
