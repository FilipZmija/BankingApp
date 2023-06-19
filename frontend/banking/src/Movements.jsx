import React from "react";
function Movements(props) {
	return (
		<div className='movements'>
			{props.movements.map((movement, ix) => (
				<div className='movements__row'>
					<div
						className={`movements__type movements__type--${movement.type}`}
					>
						{`${ix} ${movement.type}`}
					</div>
					<div className='movements__date'>{movement.date}</div>
					<div className='movements__value'>{`${movement.value} ${movement.currency}`}</div>
				</div>
			))}
		</div>
	);
}
export default Movements;
