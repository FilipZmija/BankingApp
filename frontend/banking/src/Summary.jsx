import React from "react";
import { useState } from "react";
function Summary(props) {
	const summaries = [
		{
			title: "In",
			className: "summary__value summary__value--in",
			value: props.income,
			currency: "$",
		},
		{
			title: "Out",
			className: "summary__value summary__value--in",
			value: props.outcome,
			currency: "$",
		},
		{
			title: "Interest",
			className: "summary__value summary__value--in",
			value: props.interestRate,
			currency: "%",
		},
	];
	return (
		<div className='summary'>
			{summaries.map((summary) => (
				<>
					<p className='summary__label'>{summary.title}</p>
					<p
						className={`summary__value summary__value--${summary.title.toLowerCase()}`}
					>
						{`${summary.value} ${summary.currency}`}
					</p>
				</>
			))}
			<button className='btn--sort'>&darr; SORT</button>
		</div>
	);
}
export default Summary;
