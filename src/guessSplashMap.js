import React, { useMemo, useRef, useState, useEffect } from "react";
import './css/sites/guessSplashMap.css';
import './css/headMenu.css';
import './css/topBar.css';
import { dataObjectMaps } from "./data/dataObjectMaps";
import { AnswerBoxes } from "./AnswerBoxesMap";
import SearchBarMaps from "./SearchBarMaps";

import classicImage from './assets/img/Classic.png';
import abilityImage from './assets/img/Ability.png';
import emojiImage from './assets/img/Emoji.png';
import quoteImage from './assets/img/Quote.png';
import splashImage from './assets/img/Splash.png';

function App() {
    const [userAnswer, setUserAnswer] = useState('');
    const [zoomLevel, setZoomLevel] = useState('zoom'); // Initialer Zoom-Zustand
    const [scale, setScale] = useState(10); // Start-Skalierung bei 10
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    const answer = useRef(dataObjectMaps[Math.floor(Math.random() * dataObjectMaps.length)]);
    
    const mapName = answer.current.mapname.toString().replace(/[.'" \-_:’]/g, '');
    
    const [winSpin, setWinSpin] = useState('');
    const tries = useRef([]);
    const [win, setWin] = useState(false);

    // Zufällige Position für die Translate-Werte bei jedem Start festlegen
    useEffect(() => {
        const randomTranslateX = Math.floor(Math.random() * 101) - 50; // Wert zwischen -50 und 50
        const randomTranslateY = Math.floor(Math.random() * 101) - 50; // Wert zwischen -50 und 50
        setTranslateX(randomTranslateX);
        setTranslateY(randomTranslateY);
    }, []); // Nur einmal beim Laden der Komponente ausführen
    
    const initReset = () => {
        setTimeout(() => {
            setUserAnswer('');
            setWinSpin('');
            setWin(false);
            setScale(10); // Scale zurück auf 10 setzen
            setZoomLevel('zoom'); // Setze Zoom zurück
            tries.current = [];
            const randomTranslateX = Math.floor(Math.random() * 101) - 50;
            const randomTranslateY = Math.floor(Math.random() * 101) - 50;
            setTranslateX(randomTranslateX);
            setTranslateY(randomTranslateY);
            answer.current = dataObjectMaps[Math.floor(Math.random() * dataObjectMaps.length)];
        }, 300);
    }

    const getAnswer = (ans) => {
        setUserAnswer(ans);
        setScale(prevScale => Math.max(prevScale - 1, 1)); // Skaliere runter, aber nicht kleiner als 1
        setZoomLevel('zoom-normal');
    }

    const displayAnswer = (ans) => {
        if (ans !== '') tries.current.push(ans);
        return tries.current.map((el, index) => (
            <AnswerBoxes key={index} finalAnswer={answer.current} answer={el} />
        )).reverse();
    };

    const ansBox = useMemo(() => {
        if (JSON.stringify(userAnswer) === JSON.stringify([answer.current])) {
            setTimeout(() => {
                setWinSpin('initWin');
				setScale(1);
                setTimeout(() => {
                    setWin(true);
                }, 750);
            }, 250);
        }
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
                        <div className="game-wrapper">
                            <img src={classicImage} onClick={handleClickGuess} className="main-image game-grey" />
                        </div>
                        <div className="game-wrapper">
                            <img src={abilityImage} onClick={handleClickAbi} className="main-image game-grey" />
                        </div>
                        <div className="game-wrapper has-tooltip">
                            <img src={quoteImage} onClick={handleClickQuote} className="main-image game-grey" />
                        </div>
                        <div className="game-wrapper has-tooltip">
                            <img src={emojiImage} onClick={handleClickEmote} className="main-image game-grey" />
                        </div>
                        <div className="game-wrapper has-tooltip game-selected">
                            <img src={splashImage} onClick={handleClickSplash} className="main-image game-selected" />
                        </div>
                    </div>
                </div>
            </div>
            <div id="top">
                <div id="topBarSplash">
                    <div id="topBarHeader">What Map is this?</div>
                    <div id="topBarHeader">
                        <div id="splashImageFrame">
                            <img 
                                className={zoomLevel} 
                                id="splashImg" 
                                src={`https://cdn.domekologe.eu/websites/owidle/images/maps/${mapName}.webp`} 
                                alt="" 
                                style={{ 
                                    transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)` 
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {!win && <SearchBarMaps passClass={winSpin} getAnswer={getAnswer} />}
            {win && <button className='initAgain' onClick={initReset}>Play again!</button>}
            <div className={`tableContainer ${userAnswer !== '' ? 'scrollable' : ''}`}>
                {ansBox}
            </div>
        </div>
    );
}

export default App;
