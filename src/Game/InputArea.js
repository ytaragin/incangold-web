import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { choiceSelector, madeChoice } from '../slices/choice';



function InputArea() {
    const dispatch = useDispatch()
    const {stay} = useSelector(choiceSelector)

    return (
        <div className="InputArea">
            <b>Make a choice</b>
            <button className="choice" onClick={()=>dispatch(madeChoice(false))}>Continue Further</button>
            <button className="choice" onClick={()=>dispatch(madeChoice(true))}>Go Back</button>
            <div className="currentChoice">
                Current Choice: {stay ? "will stay" : "will go back"}
            </div>
        </div>
    )
}

export default InputArea;