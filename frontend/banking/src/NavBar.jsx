import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import logo from "./media/logo.png";
import User from "./context/User";

function NavBar({ login, logout }) {
	const { user, setUser } = useContext(User);
	const [username, setUsername] = useState();
	const [pin, setPin] = useState();

	return (
		<nav>
			<p className='welcome'>Log in to get started</p>
			<img src={logo} alt='Logo' className='logo' />
			<div className='login'>
				{!user ? (
					<>
						<input
							type='text'
							placeholder='user'
							className='login__input login__input--user'
							value={username}
							onChange={(event) => setUsername(event.target.value)}
						/>
						<input
							type='text'
							placeholder='PIN'
							maxlength='4'
							className='login__input login__input--pin'
							value={pin}
							onChange={(event) => setPin(event.target.value)}
						/>
						<button
							className='login__btn'
							onClick={() => login(username, pin)}
						>
							&rarr;
						</button>
					</>
				) : (
					<button
						className='login__btn'
						onClick={() => logout(username, user.token)}
					>
						Logout
					</button>
				)}
			</div>
		</nav>
	);
}
export default NavBar;
