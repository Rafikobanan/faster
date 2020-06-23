import React, { useContext } from 'react';
import './Menu.scss'
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/themeContext';
import Icon from '../Icon/Icon';
import { TOGGLE_THEME } from '../../reducers/types';

function Menu() {
	const {theme, themeDispatch} = useContext(ThemeContext);

	let lampIcon = '#dark-lamp';

	if (theme) {
		lampIcon = '#light-lamp';
	}

	const links = [
		{to: '/statistics', text: 'Statitics'},
		{to: '/about', text: 'About'},
		{to: '/auth', text: 'Auth'},
	];

	return (
		<div className={`menu ${theme}`}>
			<div className="menu__logo"><Link to="/">Faster</Link></div>
			<nav className="menu__nav">
				<ul className="menu__list">
					{links.map((link, ind) => (
						<li key={ind} className="menu__item">
							<Link to={link.to}>{link.text}</Link>
						</li>
					))}
					<li className="menu__item">
						<Icon className="menu__icon" onClick={() => themeDispatch({type: TOGGLE_THEME})} icon={lampIcon}/>
					</li>
					<li className="menu__item">
						<Icon className="menu__icon" icon="#global"/>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Menu;