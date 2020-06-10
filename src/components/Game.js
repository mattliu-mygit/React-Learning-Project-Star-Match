import React, {useState, useEffect} from 'react';
import utils from "../math-utils"
import StarDisplay from "./StarDisplay"
import NumberButton from "./NumberButton"
import PlayAgain from "./PlayAgain"

// Custom Hook
const useGameState = () => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);
    
    useEffect(() => {
      if (secondsLeft > 0 && availableNums.length > 0) {
       const timerID =  setTimeout(() => {
          setSecondsLeft(secondsLeft - 1)
        }, 1000)
       return () => clearTimeout(timerID);
      }
    });
    const setGameState = (newCandidateNums) => {
      if(utils.sum(newCandidateNums) !== stars) {
        setCandidateNums(newCandidateNums);
      } else {
        const newAvailableNums = availableNums.filter(
        n => !newCandidateNums.includes(n)
        );
        setStars(utils.randomSumIn(newAvailableNums, 9))
        // redraw stars
        setAvailableNums(newAvailableNums);
        setCandidateNums([]);
      }
    }
    return {
      stars, availableNums, candidateNums, secondsLeft, setGameState
    }
  };
  
  const Game = (props) => {
  //   const [stars, setStars] = useState(utils.random(1, 9));
  //   const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  //   const [candidateNums, setCandidateNums] = useState([]);
  //   const [secondsLeft, setSecondsLeft] = useState(10);
    
  //   useEffect(() => {
  //     if (secondsLeft > 0 && availableNums.length > 0) {
  //      const timerID =  setTimeout(() => {
  //         setSecondsLeft(secondsLeft - 1)
  //       }, 1000)
  //      return () => clearTimeout(timerID);
  //     }
  //   });
    const {stars, availableNums, candidateNums, secondsLeft, setGameState} = useGameState();
    
    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameStatus = availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';
    
    
    
    const numberStatus = (number) => {
      if (!availableNums.includes(number)) {
        return 'used';
      }
      if (candidateNums.includes(number)) {
        return candidatesAreWrong ? 'wrong': 'candidate';
      }
      return 'available';
    };
    
    const onNumberClick = (number, currentStatus) => {
       //currentStatus = status
      if (gameStatus !== 'active' || currentStatus == 'used') {
        return;
      }
      
      const newCandidateNums = currentStatus === 'available' ? candidateNums.concat(number) : candidateNums.filter(cn => cn !== number);
      setGameState(newCandidateNums);
    };
      
    //   if(utils.sum(newCandidateNums) !== stars) {
    //     setCandidateNums(newCandidateNums);
    //   } else {
    //     const newAvailableNums = availableNums.filter(
    //     n => !newCandidateNums.includes(n)
    //     );
    //     setStars(utils.randomSumIn(newAvailableNums, 9))
    //     // redraw stars
    //     setAvailableNums(newAvailableNums);
    //     setCandidateNums([]);
    //   }
    // }
    
    return (
      <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
          <div className="left">
            {gameStatus !== 'active' ? (
              <PlayAgain onClick = {props.startNewGame} gameStatus = {gameStatus}/>
            ) : (
              <StarDisplay stars = {stars}/>
            )}
          </div>
          <div className="right">
            {utils.range(1, 9).map(
              number => <NumberButton 
                          key = {number} 
                          number = {number} 
                          status = {numberStatus(number)}
                          onClick = {onNumberClick}
                          />)}
          </div>
        </div>
        <div className="timer">Time Remaining: {secondsLeft}</div>
      </div>
    );
  };

  export default Game;