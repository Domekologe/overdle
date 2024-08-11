import React, {useRef, useState} from 'react';
import './css/searchBar.css';
import {dataObjects} from "./data/dataObjects";

const SearchBar = ({getAnswer, passClass}) => {
    const [value, setValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const options = dataObjects.map(el => el.champion);
    const usedValues = useRef([])
    const getSuggestions = (inputValue) => {
        const inputValueLowerCase = inputValue.trim().toLowerCase();
        return options.filter(option =>
            !usedValues.current.includes(option[0]) &&
            option[0].split("'").join('').toLowerCase().startsWith(inputValueLowerCase)
        );
    };
    const handleInputChange = (event) => {
        const inputValue = event.target.value
        setValue(inputValue)
        setSuggestions(getSuggestions(inputValue))
    }
    const handleSuggestionClick = (suggestion) => {
        setValue(suggestion)
        setSuggestions([])
    }
    const handleCompareClick = (viaEnter, checkMore) => {
        let userAnswer
        if(!options.find(el => el[0] == value) && suggestions.length < 1){
            return
        }
        else if(!options.find(el => el[0] == value) && suggestions.length > 0){
            userAnswer = dataObjects.filter(el => el.champion == suggestions[0])
            usedValues.current.push(suggestions[0].join(''))
        }
        else{
            userAnswer = dataObjects.filter(el => el.champion == value)
            usedValues.current.push(value)
        }
        getAnswer(userAnswer)
        setSuggestions([])
        setValue('')
    }
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            handleCompareClick()
        }
    }

    return(
        <div>
            <div className={`searchBar + ${passClass}`}>
            <input
                type="text"
                value={value}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type champion name..."
            />
                <button onClick={handleCompareClick}>➤</button>
                <ul>
                    {suggestions.map((suggestion, index) => (
                        value !== '' &&
                        <li key={index} onClick={() => handleSuggestionClick(suggestion[0])}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
 )
};

export default SearchBar;
