import { createSignal } from "solid-js";

export default function Counter() {
    const [count, setCount] = createSignal(0);
    const add = () => setCount(count() + 1);
	const subtract = () => setCount(count() - 1);

    return(
        <div>
            <button onClick={subtract}>-</button>
            <p>{count()}</p>
            <button onClick={add}>+</button>
        </div>
    )
};