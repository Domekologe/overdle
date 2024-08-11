import './css/sites/Menu.css';
import './css/main.css';
import {dataObjects} from "./data/dataObjects";
import {AnswerBoxes} from "./AnswerBoxes";
import SearchBar from "./SearchBar";
import React, {useEffect, useMemo, useRef, useState} from "react";

function Menu() {
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


  return (
    <div id="mainContainer">
	<div id="shadowBox">
		
		<div id="mainMenu">
		<div id="topHead">
		
		</div>
			<a href="guessHero">
				<div class="buttonGame">
					<div id="buttonImage" class="buttonHero">
						<div id="buttonSubject"  class="buttonSubject">Hero</div>
						<div id="buttonHelp" class="buttonHelp">Get clues on every try to get the hero!</div>
					</div>
				</div>
			</a>
			
			<a href="guessAbility">
			<div class="buttonGame">
				<div id="buttonImage" class="buttonAbi">
					<div id="buttonSubject" class="buttonSubject">Ability</div>
					<div id="buttonHelp" class="buttonHelp">Guess the Hero with the Ability</div>
				</div>
			</div>
			</a>
			
			<a href="guessQuote">
			<div class="buttonGame">
				<div id="buttonImage" class="buttonQuote">
					<div id="buttonSubject" class="buttonSubject"><b>Quote</b></div>
					<div id="buttonHelp" class="buttonHelp">Guess the InGame Quote</div>
				</div>
			</div>
			</a>
			
			<a href="guessSplashHero">
			<div class="buttonGame">
				<div id="buttonImage" class="buttonArt">
					<div id="buttonSubject" class="buttonSubject">Art</div>
					<div id="buttonHelp" class="buttonHelp">Guess the Splashart</div>
				</div>
			</div>
			</a>
			<a href="guessSplashMap">
			<div class="buttonGame">
				<div id="buttonImage" class="buttonMap">
					<div id="buttonSubject" class="buttonSubject">Map</div>
					<div id="buttonHelp" class="buttonHelp">Guess the Map!</div>
				</div>
			</div>
			</a>
		</div>
	</div>
</div>
  );
}

export default Menu;
