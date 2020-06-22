import React, { useContext } from 'react';
import './Layout.scss'
import Menu from '../../components/Menu/Menu';
import { ThemeContext } from '../../context/themeContext';

function Layout({children}) {
	const {theme} = useContext(ThemeContext);

	return (
		<div className={`wrapper ${theme}`}>
			<Menu />
			<div className="container">
				{children}
			</div>
		</div>
	);
}

export default Layout;