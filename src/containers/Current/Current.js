import React, { useContext } from 'react';
import './Current.scss';
import { ThemeContext } from '../../context/themeContext';
import { TextContext } from '../../context/textContext';
import Toolbar from '../../components/Toolbar/Toolbar';

function Current() {
	const {theme} = useContext(ThemeContext);
	const {text, styles} = useContext(TextContext);

	return (
		<div className={`current ${theme}`}>
			<Toolbar className="current"/>

			<div className="current__text" style={styles}>
				{text}
			</div>
		</div>
	);
}

export default Current;