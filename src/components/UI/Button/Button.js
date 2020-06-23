import React from 'react';
import {Link} from 'react-router-dom';
import './Button.scss';

function Button({children=null, className='', to='', onClick=null, theme="primary", disabled=false}) {
	if (!to) {
		return (
			<button onClick={onClick} className={`btn btn_${theme} ${className}`} disabled={disabled}>
				{children}
			</button>
		);
	}

	if (!disabled) {
		return (
			<Link to={to} onClick={onClick} className={`btn btn_${theme} ${className}`}>
				{children}
			</Link>
		);
	}

	return (
		<span className={`btn btn_${theme} ${className}`}>
			{children}
		</span>
	);
}

export default Button;