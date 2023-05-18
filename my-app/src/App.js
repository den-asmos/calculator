import styles from './App.module.css';
import { useState } from 'react';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operations = ['+', '-'];

export const App = () => {
	const [input, setInput] = useState('');
	const [displayColor, setDisplayColor] = useState(false);

	const handleInput = ({ target }) => {
		setInput(() => input + target.textContent);
	};

	const toggleColor = () => {
		setDisplayColor((previousDisplayColor) => !previousDisplayColor);
	};

	const calculateResult = () => {
		const symbol = input.includes('-') ? '-' : '+';
		const [a, b] = input.split(symbol);
		if (symbol === '+') {
			setInput(Number(a) + Number(b));
		} else {
			setInput(Number(a) - Number(b));
		}
	};

	const renderButtons = (array) => {
		return array.map((item) => (
			<button
				key={item}
				onClick={(event) => {
					if (displayColor) {
						toggleColor();
					}
					handleInput(event);
				}}
			>
				{item}
			</button>
		));
	};

	return (
		<div className={styles.calculator}>
			<p className={displayColor ? styles.displayActive : styles.display}>
				{input ? input : 0}
			</p>
			<div className={styles.functions}>
				<div className={styles.plusAndMinus}>{renderButtons(operations)}</div>
				<button
					onClick={() => {
						if (displayColor) {
							toggleColor();
						}
						setInput('');
					}}
				>
					C
				</button>
				<button
					onClick={() => {
						toggleColor();
						calculateResult();
					}}
				>
					=
				</button>
			</div>

			<div className={styles.numbers}>{renderButtons(numbers)}</div>
		</div>
	);
};
