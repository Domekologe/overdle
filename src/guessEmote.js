import './css/sites/guessEmote.css';
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
        window.location.href = "guessSplashHero";
    };
    const handleClickSplash = () => {
        window.location.href = "guessSplashMap";
    };

  return (
	
	
    <div className="App">
	<div id="topMenu">
		<div className="games-progress-container">
			<div className="rope-background"></div>
			<div className="images-container">
				<div className="game-wrapper  " data-original-title="null">
					<img src={classicImage} onClick={handleClickGuess} className="main-image game-grey " />
				</div>
				<div className="game-wrapper " data-original-title="null">
					<img src={abilityImage} onClick={handleClickAbi} className="main-image  game-grey" />
				</div>
				<div className="game-wrapper   has-tooltip" data-original-title="null">
					<img src={quoteImage} onClick={handleClickQuote} className="main-image  game-grey" />
				</div>
				<div className="game-wrapper game-selected  has-tooltip" data-original-title="null">
					<img src={emojiImage} onClick={handleClickEmote} className="main-image  game-selected" />
				</div>
				<div className="game-wrapper   has-tooltip" data-original-title="null">
					<img src={splashImage} onClick={handleClickSplash} className="main-image  game-grey" />
				</div>
			</div>
		</div>
	</div>
        {!win && <SearchBar passclassName={winSpin} getAnswer={getAnswer} />}
        {win && <button className='initAgain' onClick={initReset}>Play again!</button>}
        <div className={`tableContainer ${userAnswer !== '' ? 'scrollable' : ''}`}>
            {ansBox}
        </div>
    </div>
  );
}

export default App;
