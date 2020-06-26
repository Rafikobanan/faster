import React, { useContext } from 'react';
import './Insert.scss';
import Button from '../../components/UI/Button/Button';
import { Context } from '../../context/context';
import { CHANGE_TEXT, PARSE_TEXT, REMOVE_TEXT } from '../../reducers/types';

function Insert() {
	const {text, dispatch, theme} = useContext(Context);

	return (
		<div className={`insert ${theme}`}>
			<div className="insert__hit">Insert Text:</div>
			<textarea 
				className="insert__textarea" 
				onChange={e => dispatch({type: CHANGE_TEXT, payload: e.target.value})} 
				value={text}>
			</textarea>
			<div className="insert__btns">
				<Button 
					className="insert__btn" 
					to="/current" disabled={!text} 
					onClick={() => dispatch({type: PARSE_TEXT})}
				>Start
				</Button>
				<Button 
					className="insert__btn" 
					theme="grey" 
					onClick={() => dispatch({type: REMOVE_TEXT})} 
					disabled={!text}
				>Remove
				</Button>
			</div>
		</div>
	);
}

export default Insert;