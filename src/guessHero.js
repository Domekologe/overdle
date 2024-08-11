import './css/sites/guessHero.css';
import './css/headMenu.css';
import './css/topBar.css';
import {dataObjects} from "./data/dataObjects";
import {AnswerBoxes} from "./AnswerBoxes";
import SearchBar from "./SearchBar";
import React, {useEffect, useMemo, useRef, useState} from "react";

import classicImage from './assets/img/Classic.png';
import abilityImage from './assets/img/Ability.png';
import emojiImage from './assets/img/Emoji.png';
import quoteImage from './assets/img/Quote.png';
import splashImage from './assets/img/Splash.png';
let guessTimer = 0; 

let hint1number = 4;
let hint2number = 6;
let hint3number = 8;

function GuessHero() {
	 
    const [userAnswer, setUserAnswer] = useState('')
    const answer = useRef(dataObjects[Math.floor(Math.random() * dataObjects.length)])
    const [winSpin, setWinSpin] = useState('')
    const tries = useRef([])
    const [win, setWin] = useState(false)
	
	const [hint1Active, setHint1Active] = useState(false);
    const [hint2Active, setHint2Active] = useState(false);
    const [hint3Active, setHint3Active] = useState(false);
	
	
    console.log(answer.current)
    const initReset = () => {
        setTimeout(() => {
            setUserAnswer('');
            setWinSpin('');
            setWin(false);
            tries.current = [];
            answer.current = dataObjects[Math.floor(Math.random() * dataObjects.length)];
			console.log(answer);
			
			
			 // Reset guessTimer
			guessTimer = 0;

			// Reset hint numbers
			hint1number = 4;
			hint2number = 6;
			hint3number = 8;

			// Reset hint active states
			setHint1Active(false);
			setHint2Active(false);
			setHint3Active(false);

			// Clear hint content and reset images
			document.getElementById('hint1cont').innerHTML = `<img id="hint1" class="hint-grey" src="${classicImage}" />`;
			document.getElementById('hint2cont').innerHTML = `<img id="hint2" class="hint-grey" src="${classicImage}" />`;
			document.getElementById('hint3cont').innerHTML = `<img id="hint3" class="hint-grey" src="${classicImage}" />`;


			// Reset hint styles
			document.getElementById('hint1').classList.remove('hint-active');
			document.getElementById('hint1').classList.add('hint-grey');
			document.getElementById('hint2').classList.remove('hint-active');
			document.getElementById('hint2').classList.add('hint-grey');
			document.getElementById('hint3').classList.remove('hint-active');
			document.getElementById('hint3').classList.add('hint-grey');

			// Reset hint text content
			document.getElementById('hint1text').innerHTML = "Origin (4)";
			document.getElementById('hint2text').innerHTML = "Ability (6)";
			document.getElementById('hint3text').innerHTML = "Role (8)";

			
			
			
        },300)
    }
	
	
	
    const getAnswer = (ans) => {
        setUserAnswer(ans)
    }
    const displayAnswer = (ans) => {
		guessTimer++;
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
	
	
	// Dynamische Klassenlogik basierend auf guessTimer
    useEffect(() => {
        if (guessTimer === 4) {
            document.getElementById('hint1').classList.remove('hint-grey');
            document.getElementById('hint1').classList.add('hint-active');
			document.getElementById('hint1text').innerHTML = "Origin"
			setHint1Active(true);
        }
        if (guessTimer === 6) {
            document.getElementById('hint2').classList.remove('hint-grey');
            document.getElementById('hint2').classList.add('hint-active');
			document.getElementById('hint2text').innerHTML = "Ability"
			setHint2Active(true);
        }
        if (guessTimer === 8) {
            document.getElementById('hint3').classList.remove('hint-grey');
            document.getElementById('hint3').classList.add('hint-active');
			document.getElementById('hint3text').innerHTML = "Role"
			setHint3Active(true);
        }
		if (guessTimer < 4){hint1number--; document.getElementById('hint1text').innerHTML = "Origin ("+hint1number+")"}
		if (guessTimer < 6){hint2number--; document.getElementById('hint2text').innerHTML = "Ability ("+hint2number+")"}
		if (guessTimer < 8){hint3number--; document.getElementById('hint3text').innerHTML = "Role ("+hint3number+")"}
    }, [userAnswer]);  // Diese useEffect wird jedes Mal ausgeführt, wenn sich userAnswer ändert

	
	const handleClickHint1 = () => {
		if(hint1Active){
			document.getElementById('hint1cont').innerHTML = answer.current.origin.toString();
		}
	};
	
	const handleClickHint2 = () => {
		if(hint2Active){
			document.getElementById('hint2cont').innerHTML = answer.current.primaryFire.toString();
		}
	};
	
	const handleClickHint3 = () => {
		if(hint3Active){
			document.getElementById('hint3cont').innerHTML = answer.current.role.toString();
		}
	};
	
  return (
    <div className="GuessHero">
	<div id="topMenu">
		<div className="games-progress-container">
			<div className="rope-background"></div>
			<div className="images-container">
				<div className="game-wrapper game-selected " data-original-title="null">
					<img src={classicImage} onClick={handleClickGuess} className="main-image game-selected " />
				</div>
				<div className="game-wrapper  " data-original-title="null">
					<img src={abilityImage} onClick={handleClickAbi} className="main-image  game-grey" />
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
		<div id="topBar">
			<div id="topBarHeader">Hints</div>
			<div id="topBarHeader">
				<div id="hint1cont"  onClick={handleClickHint1} className="hint"><img id="hint1" className="hint-grey" src={classicImage} /></div>
				<div id="hint2cont"  onClick={handleClickHint2} className="hint"><img id="hint2" className="hint-grey" src={classicImage} /></div>
				<div id="hint3cont"  onClick={handleClickHint3} className="hint"><img id="hint3" className="hint-grey" src={classicImage} /></div>
			</div>
			<div id="topBarHeader">
				<div id="hint1text" className="hint">Origin (3)</div>
				<div id="hint2text" className="hint">Ability (5)</div>
				<div id="hint3text" className="hint">Role (7)</div>
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

export default GuessHero;
