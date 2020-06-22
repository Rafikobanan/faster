import React, { useContext } from 'react';
import './Insert.scss';
import Button from '../../components/UI/Button/Button';
import { TextContext } from '../../context/textContext';
import { ThemeContext } from '../../context/themeContext';

function Insert() {
	const {text, changeText, removeText} = useContext(TextContext);
	const {theme} = useContext(ThemeContext);

	return (
		<div className={`insert ${theme}`}>
			<div className="insert__hit">Insert Text:</div>
			<textarea className="insert__textarea" onChange={changeText} value={text}></textarea>
			<div className="insert__btns">
				<Button className="insert__btn" to="/current">Start</Button>
				<Button className="insert__btn" theme="grey" onClick={removeText}>Remove</Button>
			</div>
		</div>
	);
}

export default Insert;