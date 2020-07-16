import React, {useContext} from 'react';
import './Layout.scss';
import Menu from '../../components/Menu/Menu';
import {Context} from '../../context/context';
import Cloud from '../../components/Cloud/Cloud';
import { ToastContainer } from 'react-toastify';

function Layout({children}) {
	const {theme} = useContext(Context);
	const pathname = window.location.pathname;

	return (
		<div className={`wrapper ${theme}`}>
			{pathname === '/current-word' ? '' : <Menu />}
			<div className="container">
				{children}
				{pathname === '/current-word' ? '' : <Cloud />}
			</div>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
}

export default Layout;
