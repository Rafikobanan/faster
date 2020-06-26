import React, { useContext } from 'react';
import Icon from '../Icon/Icon';
import { Context } from '../../context/context';
import Select from '../UI/Select/Select';
import { CHANGE_FONT_SIZE, CHANGE_SPEED, CHANGE_FONT_FAMILY, CHANGE_POSITION } from '../../reducers/types';
import './Toolbar.scss';
import useHint from '../../hooks/Hint/hint.hook';

function Toolbar({className=''}) {
	const {dispatch, speed, theme} = useContext(Context);

	const options = [
		'Verdana',
		'Helvetica',
		'Times New Roman',
		'sans-serif',
		'Tahoma',
		'Arial'
	];

	useHint();

	return (
		<div className={`toolbar ${theme} ${className ? `${className}__toolbar` : ''}`}>
			<div data-hint={"Increase font"} className="toolbar__tool" onClick={() => dispatch({type: CHANGE_FONT_SIZE, payload: 2})}>
				<Icon className="toolbar__icon" icon="#increase-font" />
			</div>
			<div data-hint={"Decrease font"} className="toolbar__tool" onClick={() => dispatch({type: CHANGE_FONT_SIZE, payload: -2})}>
				<Icon className="toolbar__icon" icon="#decrease-font" />
			</div>
			<input 
				type="number" 
				onChange={e => dispatch({type: CHANGE_SPEED, payload: +e.target.value})} 
				value={speed} 
				className="toolbar__tool toolbar__input"
				data-hint={"Words per minute"}
			/>
			<Select 
				className="toolbar__tool toolbar__select" 
				onChange={e => dispatch({type: CHANGE_FONT_FAMILY, payload: e.target.value})}
				options={options}
				hint={"Font"}
			/>
			<div className="toolbar__tool toolbar__arrows" data-hint={"Text position"}>
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
			<div className="toolbar__tool" data-hint={"Start"}>
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
