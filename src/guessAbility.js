import './css/sites/guessAbility.css';
import './css/headMenu.css';
import './css/topBar.css';
import {dataObjects} from "./data/dataObjects";
import {AnswerBoxes} from "./AnswerBoxesAbility";
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
	
	//const answer = useRef(dataObjects[7]);
	console.log(answer);
	
	const [abiAnswer, setAbiAnswer] = useState('');	
	useEffect(() => {
		const abiNumber = Math.floor(Math.random() * 5); // Generiert eine zufällige Zahl zwischen 0 und 4
		console.log(abiNumber);
		
		if (abiNumber === 0 && (answer.current.ability.toString() !== "N/A" && answer.current.ability.toString() !== "Zoom") ) {
			setAbiAnswer(answer.current.ability.toString().replace(/[.'" \-_:’]/g, ''));
		} else if (abiNumber === 1 && (answer.current.ability2.toString() !== "N/A" && answer.current.ability2.toString() !== "Zoom")) {
			setAbiAnswer(answer.current.ability2.toString().replace(/[.'" \-_:’]/g, ''));
		} else if (abiNumber === 2 && (answer.current.primaryFire.toString() !== "N/A" && answer.current.primaryFire.toString() !== "Zoom")) {
			setAbiAnswer(answer.current.primaryFire.toString().replace(/[.'" \-_:’]/g, ''));
		} else if (abiNumber === 3 && (answer.current.secondaryFire.toString() !== "N/A" && answer.current.secondaryFire.toString() !== "Zoom")) {
			setAbiAnswer(answer.current.secondaryFire.toString().replace(/[.'" \-_:’]/g, ''));
		} else if (abiNumber === 4 && (answer.current.ultimate.toString() !== "N/A" && answer.current.ultimate.toString() !== "Zoom")) {
			setAbiAnswer(answer.current.ultimate.toString().replace(/[.'" \-_:’]/g, ''));
		} else if(answer.current.ability2.toString() === "N/A" && answer.current.ability2.toString() === "Zoom"){
			setAbiAnswer(answer.current.ability.toString().replace(/[.'" \-_:’]/g, ''));
		} else{
			setAbiAnswer(answer.current.primaryFire.toString().replace(/[.'" \-_:’]/g, ''))
		}
	}, [answer]);
	
	
	console.log(abiAnswer)
	
	const champName = answer.current.champion.join('').replace(/[.'" ]/g, '');
	
    const [winSpin, setWinSpin] = useState('')
    const tries = useRef([])
    const [win, setWin] = useState(false)
    
    const initReset = () => {
        setTimeout(() => {
            setUserAnswer('');
            setWinSpin('');
            setWin(false);
            tries.current = [];
            answer.current = dataObjects[Math.floor(Math.random() * dataObjects.length)];
			
			// Neue Fähigkeit auswählen und setzen
			const abiNumber = Math.floor(Math.random() * 5); // Generiert eine zufällige Zahl zwischen 0 und 4
			
			if (abiNumber === 0 && (answer.current.ability.toString() !== "N/A" && answer.current.ability.toString() !== "Zoom") ) {
				setAbiAnswer(answer.current.ability.toString().replace(/[.'" \-_:’]/g, ''));
			} else if (abiNumber === 1 && (answer.current.ability2.toString() !== "N/A" && answer.current.ability2.toString() !== "Zoom")) {
				setAbiAnswer(answer.current.ability2.toString().replace(/[.'" \-_:’]/g, ''));
			} else if (abiNumber === 2 && (answer.current.primaryFire.toString() !== "N/A" && answer.current.primaryFire.toString() !== "Zoom")) {
				setAbiAnswer(answer.current.primaryFire.toString().replace(/[.'" \-_:’]/g, ''));
			} else if (abiNumber === 3 && (answer.current.secondaryFire.toString() !== "N/A" && answer.current.secondaryFire.toString() !== "Zoom")) {
				setAbiAnswer(answer.current.secondaryFire.toString().replace(/[.'" \-_:’]/g, ''));
			} else if (abiNumber === 4 && (answer.current.ultimate.toString() !== "N/A" && answer.current.ultimate.toString() !== "Zoom")) {
				setAbiAnswer(answer.current.ultimate.toString().replace(/[.'" \-_:’]/g, ''));
			} else if(answer.current.ability2.toString() === "N/A" && answer.current.ability2.toString() === "Zoom"){
				setAbiAnswer(answer.current.ability.toString().replace(/[.'" \-_:’]/g, ''));
			} else{
				setAbiAnswer(answer.current.primaryFire.toString().replace(/[.'" \-_:’]/g, ''))
			}
			
			
	
			
			
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
				<div className="game-wrapper game-selected " data-original-title="null">
					<img src={abilityImage} onClick={handleClickAbi} className="main-image  game-selected" />
				</div>
				<div className="game-wrapper   has-tooltip" data-original-title="null">
					<img src={quoteImage} onClick={handleClickQuote} className="main-image  game-grey" />
				</div>
				<div className="game-wrapper   has-tooltip" data-original-title="null">
					<img src={emojiImage} onClick={handleClickEmote} className="main-image  game-grey" />
				</div>
				<div className="game-wrapper   has-tooltip" data-original-title="null">
					<img src={splashImage} onClick={handleClickSplash} className="main-image  game-grey" />
				</div>
			</div>
		</div>
	</div>
	<div id="top">
		<div id="topBarAbi">
			<div id="topBarHeader">Who use this Ability?</div>
			<div id="topBarHeader"><img id="abiImg" src={`https://cdn.domekologe.eu/websites/owidle/images/abilities/${champName}-${abiAnswer}.webp`} alt="" /></div>
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
