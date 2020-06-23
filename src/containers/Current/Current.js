import React, { useContext } from 'react';
import Icon from '../../components/Icon/Icon';
import './Current.scss';
import { ThemeContext } from '../../context/themeContext';
import { TextContext } from '../../context/textContext';
import Select from '../../components/UI/Select/Select';
import { CHANGE_FONT_SIZE, CHANGE_SPEED, CHANGE_FONT_FAMILY, CHANGE_POSITION } from '../../reducers/types';

function Current() {
	const {theme} = useContext(ThemeContext);
	const {text, styles, speed, textDispatch} = useContext(TextContext);

	const options = [
		'Verdana',
		'Helvetica',
		'Times New Roman',
		'sans-serif',
		'Tahoma',
		'Arial'
	];

	return (
		<div className={`current ${theme}`}>
			<div className="current__toolbar">
				<div className="current__tool" onClick={() => textDispatch({type: CHANGE_FONT_SIZE, payload: 2})}>
					<Icon className="current__icon" icon="#increase-font" />
				</div>
				<div className="current__tool" onClick={() => textDispatch({type: CHANGE_FONT_SIZE, payload: -2})}>
					<Icon className="current__icon" icon="#decrease-font" />
				</div>
				<input 
					type="number" 
					onChange={e => textDispatch({type: CHANGE_SPEED, payload: +e.target.value})} 
					value={speed} 
					className="current__tool current__input"
				/>
				<Select 
					className="current__tool current__select" 
					onChange={e => textDispatch({type: CHANGE_FONT_FAMILY, payload: e.target.value})}
					options={options}
				/>
				<div className="current__tool current__arrows">
					<Icon 
						className="current__icon" 
						icon="#arrow-top" 
						onClick={() => textDispatch({type: CHANGE_POSITION, payload: -1})}
					/>
					<Icon 
						className="current__icon" 
						icon="#arrow-top" 
						style={{transform: 'rotate(180deg)'}} 
						onClick={() => textDispatch({type: CHANGE_POSITION, payload: 1})}
					/>
				</div>
			</div>

			<div className="current__text" style={styles}>
				{text}
			</div>
		</div>
	);
}

export default Current;