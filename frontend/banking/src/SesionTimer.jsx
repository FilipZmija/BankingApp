import React from "react";
import { useEffect } from "react";
function SesionTimer(props) {
	return (
		<div className='timer'>
			<p className='summary__label'>
				Session ends: {props.timer.minutes}:
				{props.timer.seconds < 10
					? "0" + props.timer.seconds
					: props.timer.seconds}
			</p>
		</div>
	);
}
export default SesionTimer;
