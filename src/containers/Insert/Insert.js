import React, { useContext } from 'react';
import './Insert.scss';
import Button from '../../components/UI/Button/Button';
import { TextContext } from '../../context/textContext';
import { ThemeContext } from '../../context/themeContext';
import { CHANGE_TEXT, PARSE_TEXT, REMOVE_TEXT } from '../../reducers/types';

function Insert() {
	const {text, textDispatch} = useContext(TextContext);
	const {theme} = useContext(ThemeContext);

	return (
		<div className={`insert ${theme}`}>
			<div className="insert__hit">Insert Text:</div>
			<textarea 
				className="insert__textarea" 
				onChange={e => textDispatch({type: CHANGE_TEXT, payload: e.target.value})} 
				value={text}>
			</textarea>
			<div className="insert__btns">
				<Button 
					className="insert__btn" 
					to="/current" disabled={!text} 
					onClick={() => textDispatch({type: PARSE_TEXT})}
				>Start
				</Button>
				<Button 
					className="insert__btn" 
					theme="grey" 
					onClick={() => textDispatch({type: REMOVE_TEXT})} 
					disabled={!text}
				>Remove
				</Button>
			</div>
		</div>
	);
}

export default Insert;