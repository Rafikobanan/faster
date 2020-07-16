import React, { useContext } from 'react';
import Icon from '../Icon/Icon';
import './Cloud.scss';
import { Context } from '../../context/context';
import { toast } from 'react-toastify';
import useTranslate from '../../hooks/useTranslate/translate.hook';

function Cloud() {
	const {request, state, auth, language} = useContext(Context);
	const t = useTranslate('Cloud', language);

	const clickHandler = async () => {
		try {
			await request(
				'/api/data',
				'POST', 
				{
					text: state.text,
					styles: {
						fontSize: state.styles.fontSize,
						fontFamily: state.styles.fontFamily,
						marginTop: state.styles.marginTop,
					},
					speed: state.speed,
					theme: state.theme,
					statistics: state.statistics,
				},
				{Authorization: `Bearer ${auth.token}`}
			);
			toast.success(t['Data saved successfully']);
		} catch (e) {
			toast.error('Something went wrong');
		}
	}

	return (
		<>
			{auth.token ?
				<Icon
					icon="#to-cloud"
					onClick={clickHandler}
					className="cloud"
				/> : ''}
		</>
	);
}

export default Cloud;