import React, {useRef, useState} from 'react';
import './css/searchBar.css';
import {dataObjectsQuotes} from "./data/dataObjectsQuotes";

const SearchBar = ({getAnswer, passClass}) => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // Einzigartige Optionen basierend auf Champion-Namen erstellen
    const options = [...new Set(dataObjectsQuotes.map(el => el.champion[0]))];

    const usedValues = useRef([]);

    const getSuggestions = (inputValue) => {
        const inputValueLowerCase = inputValue.trim().toLowerCase();
        return options.filter(option =>
            !usedValues.current.includes(option) &&
            option.toLowerCase().startsWith(inputValueLowerCase)
        );
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setValue(inputValue);
        setSuggestions(getSuggestions(inputValue));
    };

    const handleSuggestionClick = (suggestion) => {
        setValue(suggestion);
        setSuggestions([]);
    };

    const handleCompareClick = () => {
        let userAnswer;

        if (!options.includes(value) && suggestions.length < 1) {
            return;
        } else if (!options.includes(value) && suggestions.length > 0) {
            userAnswer = dataObjectsQuotes.filter(el => el.champion[0] === suggestions[0]);
            usedValues.current.push(suggestions[0]);
        } else {
            userAnswer = dataObjectsQuotes.filter(el => el.champion[0] === value);
            usedValues.current.push(value);
        }

        getAnswer(userAnswer);
        setSuggestions([]);
        setValue('');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleCompareClick();
        }
    };

    return (
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
                        <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchBar;
