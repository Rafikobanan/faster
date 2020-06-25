import React, { useContext } from 'react';
import './Current.scss';
import { ThemeContext } from '../../context/themeContext';
import { TextContext } from '../../context/textContext';
import Toolbar from '../../components/Toolbar/Toolbar';
import { CHANGE_CURRENT_WORD } from '../../reducers/types';
import useEventListener from '../../hooks/event.hook';

const wordsToShow = 200;

function Current() {
	const {theme} = useContext(ThemeContext);
	const {parsedText, currentIndex, currentWord, styles, textDispatch} = useContext(TextContext);

	const keyDownHandler = e => {
		switch (e.key.toUpperCase()) {
			case 'ARROWLEFT':
				textDispatch({type: CHANGE_CURRENT_WORD, payload: -1});
				return;
			case 'ARROWRIGHT':
				textDispatch({type: CHANGE_CURRENT_WORD, payload: 1});
				return;
			default:
				return;
		} 
	};

	useEventListener('keydown', keyDownHandler);

	const start = Math.floor(currentIndex / wordsToShow) * wordsToShow;

	const before = parsedText.slice(start, currentIndex).map(obj => obj.word).join(' ');
	const after = parsedText.slice(currentIndex + 1, Math.min(parsedText.length, start + wordsToShow)).map(obj => obj.word).join(' ');

	const word = currentWord.word;
	const index = currentWord.letterInd;

	const ellipsis = currentIndex + wordsToShow < parsedText.length ? '.....' : '';

	return (
		<div tabIndex="0" className={`current ${theme}`}>
			<Toolbar className="current"/>

			<div className="current__text" style={styles}>
				{before + ' '}
				<span className="current__word" data-index={currentIndex}>
					{word.slice(0, index)}
					<span className="current__letter">
						{word[index]}
					</span>
					{word.slice(index + 1) + ' '}
				</span>
				{after}{ellipsis}
			</div>
		</div>
	);
}

export default Current;