import { useState } from "react";

export const CounterApp = ({ value }) => {

    /*let counter = 0;

    const counterIncrement = () => {
        counter += 1;
        console.log('Click! ' + counter);
    }*/

    const [counter, setCounter] = useState(value);

    const counterIncrement = () => setCounter(c => c + 1);

    return(
        <>
            <h2>El valor del contador es { counter }</h2>
            <button onClick={ counterIncrement } >Incrementar Contador +1</button>
        </>
    );
};