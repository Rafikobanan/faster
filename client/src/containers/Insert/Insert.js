import React, {useContext} from 'react';
import './Insert.scss';
import Button from '../../components/UI/Button/Button';
import {Context} from '../../context/context';
import {CHANGE_TEXT, PARSE_TEXT, REMOVE_TEXT} from '../../reducers/types';
import useTranslate from '../../hooks/useTranslate/translate.hook';

function Insert() {
	const {dispatch, text, language} = useContext(Context);

	const t = useTranslate('Insert', language);

	return (
		<div className={'insert'}>
			<div className="insert__hit">{t['Insert Text:']}</div>
			<textarea
				className="insert__textarea"
				onChange={(e) => dispatch({type: CHANGE_TEXT, payload: e.target.value})}
				value={text}>
			</textarea>
			<div className="insert__btns">
				<Button
					className="insert__btn"
					to="/current" disabled={!text}
					onClick={() => dispatch({type: PARSE_TEXT})}
				>{t['Start']}
				</Button>
				<Button
					className="insert__btn"
					theme="grey"
					onClick={() => dispatch({type: REMOVE_TEXT})}
					disabled={!text}
				>{t['Remove']}
				</Button>
			</div>
		</div>
	);
}

export default Insert;
