import React, { useContext } from 'react';
import Icon from '../Icon/Icon';
import { TextContext } from '../../context/textContext';
import Select from '../UI/Select/Select';
import { CHANGE_FONT_SIZE, CHANGE_SPEED, CHANGE_FONT_FAMILY, CHANGE_POSITION } from '../../reducers/types';
import { ThemeContext } from '../../context/themeContext';
import './Toolbar.scss';

function Toolbar({className=''}) {
	const {textDispatch, speed} = useContext(TextContext);
	const {theme} = useContext(ThemeContext);

	const options = [
		'Verdana',
		'Helvetica',
		'Times New Roman',
		'sans-serif',
		'Tahoma',
		'Arial'
	];

	return (
		<div className={`toolbar ${theme} ${className ? `${className}__toolbar` : ''}`}>
			<div className="toolbar__tool" onClick={() => textDispatch({type: CHANGE_FONT_SIZE, payload: 2})}>
				<Icon className="toolbar__icon" icon="#increase-font" />
			</div>
			<div className="toolbar__tool" onClick={() => textDispatch({type: CHANGE_FONT_SIZE, payload: -2})}>
				<Icon className="toolbar__icon" icon="#decrease-font" />
			</div>
			<input 
				type="number" 
				onChange={e => textDispatch({type: CHANGE_SPEED, payload: +e.target.value})} 
				value={speed} 
				className="toolbar__tool toolbar__input"
			/>
			<Select 
				className="toolbar__tool toolbar__select" 
				onChange={e => textDispatch({type: CHANGE_FONT_FAMILY, payload: e.target.value})}
				options={options}
			/>
			<div className="toolbar__tool toolbar__arrows">
				<Icon 
					className="toolbar__icon" 
					icon="#arrow-top" 
					onClick={() => textDispatch({type: CHANGE_POSITION, payload: -1})}
				/>
				<Icon 
					className="toolbar__icon" 
					icon="#arrow-top" 
					style={{transform: 'rotate(180deg)'}} 
					onClick={() => textDispatch({type: CHANGE_POSITION, payload: 1})}
				/>
			</div>
			<div className="toolbar__tool">
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
