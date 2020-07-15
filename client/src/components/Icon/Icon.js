import React from 'react';
import {Link} from 'react-router-dom';
import './Icon.scss';

function Icon({
	onClick = null,
	className = '',
	style = {},
	icon = '',
	to = '',
}) {
	if (to) {
		return (
			<Link to={to} className="svg-link">
				<svg className={className} onClick={onClick} style={style}>
					<use xlinkHref={`${icon}`}></use>
				</svg>
			</Link>
		);
	}

	return (
		<div onClick={onClick}>
			<svg className={className} style={style}>
				<use xlinkHref={`${icon}`}></use>
			</svg>
		</div>
	);
}

export default Icon;
