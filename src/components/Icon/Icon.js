import React from 'react';

function Icon({onClick=null, className='', style={}, icon=''}) {
	return (
		<svg className={className} onClick={onClick} style={style}>
			<use xlinkHref={`${icon}`}></use>
		</svg>
	);
}

export default Icon;