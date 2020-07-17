import React, {useContext} from 'react';
import Icon from '../Icon/Icon';
import {Context} from '../../context/context';
import Select from '../UI/Select/Select';
import {
	CHANGE_FONT_SIZE,
	CHANGE_SPEED,
	CHANGE_FONT_FAMILY,
	CHANGE_POSITION,
	CHANGE_PAGE,
} from '../../reducers/types';
import './Toolbar.scss';
import useHint from '../../hooks/Hint/hint.hook';
import useTranslate from '../../hooks/useTranslate/translate.hook';

function Toolbar({className = ''}) {
	const {
		dispatch,
		language,
		speed,
		parsedText,
		pageIndex,
	} = useContext(Context);

	const t = useTranslate('Toolbar', language);

	useHint();

	const options = [
		'Verdana',
		'Helvetica',
		'Times New Roman',
		'sans-serif',
		'Tahoma',
		'Arial',
	];

	const maxIndexPage = Math.ceil(parsedText.length / 200);

	const changeHandler = (val) => {
		dispatch({type: CHANGE_PAGE, payload: val});
	};

	return (
		<div
			className={`toolbar ${className ? `${className}__toolbar` : ''}`}
		>
			<div
				data-hint={t['Increase font']}
				className="toolbar__tool"
				onClick={() => dispatch({type: CHANGE_FONT_SIZE, payload: 4})}
			>
				<Icon className="toolbar__icon" icon="#increase-font" />
			</div>
			<div
				data-hint={t['Decrease font']}
				className="toolbar__tool"
				onClick={() => dispatch({type: CHANGE_FONT_SIZE, payload: -4})}
			>
				<Icon className="toolbar__icon" icon="#decrease-font" />
			</div>
			<input
				type="number"
				onChange={(e) =>dispatch({type: CHANGE_SPEED,
					payload: +e.target.value})}
				min={1}
				max={2000}
				value={speed}
				className="toolbar__tool toolbar__input"
				data-hint={t['Words per minute']}
			/>
			<Select
				className="toolbar__tool toolbar__select"
				onChange={(e) => dispatch({type: CHANGE_FONT_FAMILY,
					payload: e.target.value})}
				options={options}
				hint={t['Font']}
			/>
			<div
				className="toolbar__tool toolbar__arrows"
				data-hint={t['Text position']}
			>
				<Icon
					className="toolbar__icon"
					icon="#arrow-top"
					onClick={() => dispatch({type: CHANGE_POSITION, payload: -1})}
				/>
				<Icon
					className="toolbar__icon"
					icon="#arrow-top"
					style={{transform: 'rotate(180deg)'}}
					onClick={() => dispatch({type: CHANGE_POSITION, payload: 1})}
				/>
			</div>
			<div className="toolbar__tool toolbar__page" data-hint={"Текущая страница"}>
				<input
					type="number"
					min={1}
					max={maxIndexPage}
					value={pageIndex}
					onChange={(e) => changeHandler(+e.target.value)}
				/>
				<span>/ {maxIndexPage}</span>
			</div>
			<div className="toolbar__tool" data-hint={t['Start']}>
				<Icon
					className="toolbar__icon"
					icon="#play"
					to="/current-word"
				/>
			</div>
		</div>
	);
}

export default Toolbar;
