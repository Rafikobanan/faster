import React, {useContext} from 'react';
import './Current.scss';
import {Context} from '../../context/context';
import Toolbar from '../../components/Toolbar/Toolbar';
import {CHANGE_CURRENT_WORD} from '../../reducers/types';
import useEventListener from '../../hooks/event.hook';
import { useHistory } from 'react-router-dom';

function Current() {
	const {
		dispatch,
		parsedText,
		currentIndex,
		currentWord,
		styles,
		pageIndex,
	} = useContext(Context);

	const history = useHistory();

	if (parsedText.length === 0) {
		history.push('/');
	}

	const wordsToShow = 200;

	const keyDownHandler = (e) => {
		switch (e.key.toUpperCase()) {
			case 'ARROWLEFT':
				dispatch({type: CHANGE_CURRENT_WORD, payload: -1});
				return;
			case 'ARROWRIGHT':
				dispatch({type: CHANGE_CURRENT_WORD, payload: 1});
				return;
			default:
				return;
		}
	};

	const clickHandler = (e) => {
		const target = e.target;
		const word = target.closest('[data-index]');

		if (!word) return;

		dispatch({type: CHANGE_CURRENT_WORD, payload: word.dataset.index - currentIndex});
	};

	useEventListener('keydown', keyDownHandler);

	const start = Math.floor(currentIndex / wordsToShow) * wordsToShow;

	const before = parsedText
		.slice(start, currentIndex)
		.map((obj, ind) => <span data-index={start + ind} key={start + ind}>{obj.word + ' '}</span>);

	const after = parsedText
		.slice(currentIndex + 1, Math.min(parsedText.length, start + wordsToShow))
		.map((obj, ind) => <span data-index={currentIndex + 1 + ind} key={currentIndex + 1 + ind}>{obj.word + ' '}</span>);

	const word = currentWord.word;
	const index = currentWord.letterInd;

	const ellipsis = (pageIndex - 1) * 200 + wordsToShow < parsedText.length ?
		'.....' :
		'';

	return (
		<div tabIndex="0" className={'current'}>
			<Toolbar className="current"/>

			<div className="current__text" style={styles} onClick={clickHandler}>
				{before}{' '}
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
