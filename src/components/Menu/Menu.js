import React, { useContext } from 'react';
import './Menu.scss'
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/themeContext';

function Menu() {
	const {theme, changeTheme} = useContext(ThemeContext);

	let lampHref = '#dark-lamp';

	if (theme) {
		lampHref = '#light-lamp';
	}

	return (
		<div className={`menu ${theme}`}>
			<div className="menu__logo"><Link to="/">Faster</Link></div>
			<nav className="menu__nav">
				<ul className="menu__list">
					<li className="menu__item">
						<Link to="/statistics">Statitics</Link>
					</li>
					<li className="menu__item">
						<Link to="/about">About</Link>
					</li>
					<li className="menu__item">
						<Link to="/auth">Auth</Link>
					</li>
					<li className="menu__item">
						<svg className="menu__icon" onClick={changeTheme}>
							<use xlinkHref={lampHref}></use>
						</svg>
					</li>
					<li className="menu__item">
						<svg className="menu__icon">
							<use xlinkHref="#global"></use>
						</svg>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Menu;