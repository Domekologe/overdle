import './css/answerBoxes.css'
import {useEffect, useRef} from "react";
export const AnswerBoxes = (props) => {
    const timeoutRef = useRef(null)
    let answer = props.answer[0]
    let finalAnswer = props.finalAnswer
    const mapName = answer.mapname.join('').replace(/[.'" ]/g, '')
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
            <td className={adjustClass(property)} colSpan ="5">
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
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr ref={timeoutRef}>
                        <td className='champImg'> {/*ADD IMG PROPERTY TO EACH OBJECT AND SEARCH WITH IT */}
                            <img src={`https://cdn.domekologe.eu/websites/owidle/images/maps/${mapName}.webp`} alt=""/>
                        </td>
						{displayedAnswer('mapname')}
                    </tr>
                </tbody>
            </table>
        </>
    )
}
