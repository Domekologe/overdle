import './css/App.css';
import './css/headMenu.css';
import {dataObjects} from "./data/dataObjects";
import {AnswerBoxes} from "./AnswerBoxes";
import SearchBar from "./SearchBar";
import React, {useEffect, useMemo, useRef, useState} from "react";

import classicImage from './assets/img/Classic.png';
import abilityImage from './assets/img/Ability.png';
import emojiImage from './assets/img/Emoji.png';
import quoteImage from './assets/img/Quote.png';
import splashImage from './assets/img/Splash.png';

function App() {
    const [userAnswer, setUserAnswer] = useState('')
    const answer = useRef(dataObjects[Math.floor(Math.random() * dataObjects.length)])
    const [winSpin, setWinSpin] = useState('')
    const tries = useRef([])
    const [win, setWin] = useState(false)
    console.log(answer.current.release_year)
    const initReset = () => {
        setTimeout(() => {
            setUserAnswer('');
            setWinSpin('');
            setWin(false);
            tries.current = [];
            answer.current = dataObjects[Math.floor(Math.random() * dataObjects.length)];
        },300)
    }
    const getAnswer = (ans) => {
        setUserAnswer(ans)
    }
    const displayAnswer = (ans) => {
        if(ans !== '') tries.current.push(ans);
        return tries.current.map((el, index) => (
               <AnswerBoxes key={index} finalAnswer={answer.current} answer={el} />
           )).reverse();
    };
    const ansBox = useMemo(() => {
        if(JSON.stringify(userAnswer) === JSON.stringify([answer.current])) setTimeout(() => {
            setWinSpin('initWin')
            setTimeout(() => {
                setWin(true)
            },750)

        },250)
            return displayAnswer(userAnswer);
    }, [userAnswer]);


	const handleClickGuess = () => {
		window.location.href = "guessHero";
	  };
		  
	const handleClickQuote = () => {
		window.location.href = "guessQuote";
	};
	const handleClickAbi = () => {
		window.location.href = "guessAbility";
	};
	const handleClickEmote = () => {
		window.location.href = "guessEmote";
	};
	const handleClickSplash = () => {
		window.location.href = "guessSplash";
	};

  return (
	
	
    <div className="App">
	<div class="games-progress-container">
		<div class="rope-background"></div>
		<div class="images-container">
			<div class="game-wrapper game-selected " data-original-title="null">
				<img src={classicImage} onClick={handleClickGuess} class="main-image game-selected " />
			</div>
			<div class="game-wrapper  " data-original-title="null">
				<img src={abilityImage} onClick={handleClickAbi} class="main-image  game-grey" />
			</div>
			<div class="game-wrapper   has-tooltip" data-original-title="null">
				<img src={quoteImage} onClick={handleClickQuote} class="main-image  game-grey" />
			</div>
			<div class="game-wrapper   has-tooltip" data-original-title="null">
				<img src={emojiImage} onClick={handleClickEmote} class="main-image  game-grey" />
			</div>
			<div class="game-wrapper   has-tooltip" data-original-title="null">
				<img src={splashImage} onClick={handleClickSplash} class="main-image  game-grey" />
			</div>
		</div>
	</div>
        {!win && <SearchBar passClass={winSpin} getAnswer={getAnswer} />}
        {win && <button className='initAgain' onClick={initReset}>Play again!</button>}
        <div className={`tableContainer ${userAnswer !== '' ? 'scrollable' : ''}`}>
            {ansBox}
        </div>
    </div>
  );
}

export default App;
