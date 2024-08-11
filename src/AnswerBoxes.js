import './css/answerBoxes.css'
import {useEffect, useRef} from "react";
export const AnswerBoxes = (props) => {
    const timeoutRef = useRef(null)
    let answer = props.answer[0]
    let finalAnswer = props.finalAnswer
    const champName = answer.champion.join('').replace(/[.'" ]/g, '')
    const adjustClass = (specAns) => {
        const commonElements = answer[specAns].filter((el) => finalAnswer[specAns].includes(el));
        const areEqual = answer[specAns].length === finalAnswer[specAns].length && commonElements.length === finalAnswer[specAns].length
        if (areEqual) {
            return 'makeGreen'
        } else if (commonElements.length > 0) {
            return 'makeYellow';
        } else {
            if(specAns === 'releaseYear'){
                let arrow
                answer[specAns][0] < finalAnswer[specAns][0] ? arrow = 'yearBefore' : arrow = 'yearAfter'
                return `makeRed ${arrow}`
            }
			if(specAns === 'health'){
                let arrow
                answer[specAns][0] < finalAnswer[specAns][0] ? arrow = 'yearBefore' : arrow = 'yearAfter'
                return `makeRed ${arrow}`
            }
			if(specAns === 'age'){
                let arrow
                answer[specAns][0] < finalAnswer[specAns][0] ? arrow = 'yearBefore' : arrow = 'yearAfter'
				if(answer[specAns][0] === "N/A"){return 'makeRed'}
                return `makeRed ${arrow}`
            }
            else return 'makeRed';
        }
    }

    useEffect(() => {
        for (let i = 0; i < timeoutRef.current.children.length; i++){
            const delay = i * 300;
            setTimeout(() => {
                timeoutRef.current.children[i].classList.add('reveal')
            },delay)
        }
    },[])

    const displayedAnswer = (property) => {
        return (
            <td className={adjustClass(property)}>
                <div>
                {(answer[property]).length > 1 ? (answer[property]).join(', ') : answer[property]}
                </div>
            </td>
        )
    }
	
	
    return(
        <>
            <table>
                <tbody>
                    <tr>
                        <th>Champion</th>
                        <th>Gender</th>
                        <th>Continent</th>
                        <th>Age</th>
                        <th>Health</th>
                        <th>Release year</th>
                    </tr>
                    <tr ref={timeoutRef}>
                        <td className='champImg'> {/*ADD IMG PROPERTY TO EACH OBJECT AND SEARCH WITH IT */}
                            <img src={`https://cdn.domekologe.eu/websites/owidle/images/heroes/Icon-${champName}.webp`} alt=""/>
                        </td>
                        {displayedAnswer('gender')}
                        {displayedAnswer('continent')}
                        {displayedAnswer('age')}
                        {displayedAnswer('health')}
                        {displayedAnswer('releaseYear')}
                    </tr>
                </tbody>
            </table>
        </>
    )
}
