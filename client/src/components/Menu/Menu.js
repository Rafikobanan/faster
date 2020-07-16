import React, {useContext, useState} from 'react';
import './Menu.scss';
import {Link} from 'react-router-dom';
import Icon from '../Icon/Icon';
import {TOGGLE_THEME, CHANGE_LANGUAGE} from '../../reducers/types';
import {Context} from '../../context/context';
import useTranslate from '../../hooks/useTranslate/translate.hook';

function Menu() {
	const {
		dispatch,
		theme,
		language,
	} = useContext(Context);

	const [isLanguagesHidden, setIsLanguagesHidden] = useState(true);
	const [isNavActive, setIsNavActive] = useState(false);

	const t = useTranslate('Menu', language);

	const pathname = window.location.pathname;

	const menuLanguageCls = [
		'menu-language',
	];

	if (!isLanguagesHidden) {
		menuLanguageCls.push('menu-language_active');
	}

	const navCls = [
		'menu__nav'
	];

	if (isNavActive) {
		navCls.push('menu__nav_active');
	}

	const languageHandler = (language) => {
		dispatch({type: CHANGE_LANGUAGE, payload: language});
		setIsLanguagesHidden(true);
	};

	let lampIcon = '#dark-lamp';

	if (theme) {
		lampIcon = '#light-lamp';
	}

	const links = [
		{to: '/statistics', text: t['Statistics']},
		{to: '/about', text: t['About']},
		{to: '/auth', text: t['Auth']},
	];

	return (
		<div className={'menu'}>
			<div className="menu__logo">
				<Link
					onClick={() => setIsNavActive(false)}
					to="/"
				>
					{pathname === '/' ? 'Faster' : t['To Home']}
				</Link>
			</div>
			<nav className={navCls.join(' ')}>
				<ul className="menu__list">
					{links.map((link, ind) => (
						<li key={ind} className="menu__item">
							<Link onClick={() => setIsNavActive(false)} to={link.to}>{link.text}</Link>
						</li>
					))}
					<li className="menu__item">
						<Icon
							className="menu__icon"
							onClick={() => dispatch({type: TOGGLE_THEME})}
							icon={lampIcon}
						/>
					</li>
					<li
						className="menu__item"
						onClick={() => setIsLanguagesHidden(!isLanguagesHidden)}
					>
						<Icon className="menu__icon" icon="#global"/>
					</li>
				</ul>
			</nav>
			<div className="menu__hamburger" onClick={() => {setIsNavActive(!isNavActive); setIsLanguagesHidden(true)}}>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<ul className={menuLanguageCls.join(' ')}>
				<li
					onClick={() => languageHandler('ru')}
					className="menu-language__item"
				>
					<Icon className="menu-language__icon" icon="#russia"/>
				</li>
				<li
					onClick={() => languageHandler('en')}
					className="menu-language__item"
				>
					<Icon className="menu-language__icon" icon="#uk"/>
				</li>
			</ul>
		</div>
	);
}

export default Menu;
