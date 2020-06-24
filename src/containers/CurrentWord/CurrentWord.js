import React, { useRef, useEffect, useContext } from 'react';
import './CurrentWord.scss';
import { TextContext } from '../../context/textContext';
import useInterval from '../../hooks/interval.hook';
import { CHANGE_CURRENT_WORD } from '../../reducers/types';

const marginTop = 117;

function CurrentWord() {
	const spanEl = useRef(null);
	const form = useRef(null);
	const inner = useRef(null);

	const {styles, currentWord, speed, textDispatch} = useContext(TextContext);

	useInterval(() => {
		textDispatch({type: CHANGE_CURRENT_WORD, payload: 1});
	}, calculateInterval(speed));

	useEffect(() => {
		const spanCoords = spanEl.current.getBoundingClientRect();
		const spanCenter = spanCoords.left + spanCoords.width / 2;

		const formCoords = form.current.getBoundingClientRect();
		const formCenter = formCoords.left + formCoords.width / 2;

		const innerCoords = inner.current.getBoundingClientRect();

		inner.current.style.transform = `translateX(${formCenter - spanCenter + innerCoords.left - formCoords.left}px)`;
	});

	return (
		<div ref={form} className="current-word" style={{...styles, marginTop: styles.marginTop + marginTop}}>
			<div ref={inner} className="current-word__inner">
				{currentWord.word.slice(0, currentWord.letterInd)}
				<span ref={spanEl} className="current-word__letter">{currentWord.word[currentWord.letterInd]}</span>
				{currentWord.word.slice(currentWord.letterInd + 1)}
			</div>
		</div>
	);
}

function calculateInterval(wordsPerMin) {
	return 60000 / wordsPerMin;
}

export default CurrentWord;