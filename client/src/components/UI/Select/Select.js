import React from 'react';

function Select({options = [], onChange = null, className = '', hint = ''}) {
	return (
		<select className={className} onChange={onChange} data-hint={hint}>
			{options.map((opt, ind) => (
				<option key={ind} value={opt}>{opt}</option>
			))}
		</select>
	);
}

export default Select;
