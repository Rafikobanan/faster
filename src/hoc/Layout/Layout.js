import React, { useContext } from 'react';
import './Layout.scss'
import Menu from '../../components/Menu/Menu';
import { Context } from '../../context/context';

function Layout({children}) {
	const {theme} = useContext(Context);
	const pathname = window.location.pathname;

	return (
		<div className={`wrapper ${theme}`}>
			{pathname === '/current-word' ? '' : <Menu />}
			<div className="container">
				{children}
			</div>
		</div>
	);
}

export default Layout;