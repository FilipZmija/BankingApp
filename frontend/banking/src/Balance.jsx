import React from "react";
import { useState, useEffect } from "react";
function Balance(props) {
	const [date, setDate] = useState(new Date().toLocaleString());

	useEffect(() => {
		setInterval(() => {
			setDate(new Date().toLocaleString());
		}, 1000);
	}, [setDate]);

	return (
		<div className='balance'>
			<div>
				<p className='balance__label'>Current balance</p>
				<p className='balance__date'>
					As of <span className='date'>{date}</span>
				</p>
			</div>
			<p className='balance__value'>{props.balance}€</p>
		</div>
	);
}
export default Balance;
