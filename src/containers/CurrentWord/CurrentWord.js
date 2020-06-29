import React, {useRef, useEffect, useContext, useMemo} from 'react';
import './CurrentWord.scss';
import {Context} from '../../context/context';
import useInterval from '../../hooks/interval.hook';
import {CHANGE_CURRENT_WORD, CHANGE_STATISTICS} from '../../reducers/types';
import {useHistory} from 'react-router-dom';
import useEventListener from '../../hooks/event.hook';
import useTranslate from '../../hooks/useTranslate/translate.hook';

function CurrentWord() {
	const {
		dispatch,
		styles,
		language,
		currentWord,
		speed,
		parsedText,
		currentIndex,
		theme,
	} = useContext(Context);

	const t = useTranslate('CurrentWord', language);

	const spanEl = useRef(null);
	const form = useRef(null);
	const inner = useRef(null);

	const marginTop = useMemo(() => 117, []);
	const counter = useRef(1);
	const interval = useMemo(() => {
		return calculateInterval(speed);
	}, [speed]);
	const timer = useRef(interval / 1000);

	const history = useHistory();

	const clickHandler = () => {
		history.push('/current');
	};

	const keydownHandler = (e) => {
		if (e.key.toUpperCase() === 'ESCAPE') {
			history.push('/current');
		}
	};

	useEventListener('click', clickHandler);
	useEventListener('keydown', keydownHandler);

	useEffect(() => {
		return () => {
			dispatch({
				type: CHANGE_STATISTICS,
				// eslint-disable-next-line react-hooks/exhaustive-deps
				payload: {readWords: counter.current, time: timer.current},
			});
		};
	}, [dispatch]);

	useInterval(() => {
		if (currentIndex !== parsedText.length - 1) {
			counter.current++;
			timer.current += interval / 1000;
		}
		dispatch({type: CHANGE_CURRENT_WORD, payload: 1});
	}, interval);

	useEffect(() => {
		const spanCoords = spanEl.current.getBoundingClientRect();
		const spanCenter = spanCoords.left + spanCoords.width / 2;

		const formCoords = form.current.getBoundingClientRect();
		const formCenter = formCoords.left + formCoords.width / 2;

		const innerCoords = inner.current.getBoundingClientRect();

		inner.current.style.transform =
			`translateX(${formCenter - spanCenter +
			innerCoords.left - formCoords.left}px)`;
	});

	return (
		<div
			style={{
				...styles,
				marginTop: 0,
				paddingTop: styles.marginTop + marginTop,
			}}
		>
			<div ref={form} className={`current-word ${theme}`}>
				<div ref={inner} className="current-word__inner">
					{currentWord.word.slice(0, currentWord.letterInd)}
					<span
						ref={spanEl}
						className="current-word__letter"
					>
						{currentWord.word[currentWord.letterInd]}
					</span>
					{currentWord.word.slice(currentWord.letterInd + 1)}
				</div>
				<div className="current-word__left">
					{parsedText.length - currentIndex - 1} {t['words left']}
				</div>
			</div>
		</div>
	);
}

function calculateInterval(wordsPerMin) {
	return 60000 / wordsPerMin;
}

export default CurrentWord;
