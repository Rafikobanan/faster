import React from 'react';
import { Link } from 'react-router-dom';
import './Icon.scss';

function Icon({onClick=null, className='', style={}, icon='', to=''}) {
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
		<svg className={className} onClick={onClick} style={style}>
			<use xlinkHref={`${icon}`}></use>
		</svg>
	);
}

export default Icon;