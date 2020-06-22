import React from 'react';
import {Link} from 'react-router-dom';
import './Button.scss';

function Button({children=null, className='', to='', onClick=null, theme="primary"}) {
	return (
		<>
			{!to ? 
			<button onClick={onClick} className={`btn btn_${theme} ${className}`}>
				{children}
			</button>
			: <Link to={to} onClick={onClick} className={`btn btn_${theme} ${className}`}>
					{children}
				</Link>}
		</>
	);
}

export default Button;