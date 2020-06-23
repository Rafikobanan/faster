import React from 'react';

function Select({options=[], onChange=null, className=''}) {
	return (
		<select className={className} onChange={onChange}>
			{options.map((opt, ind) => (
				<option key={ind} value={opt}>{opt}</option>
			))}
		</select>
	);
}

export default Select;