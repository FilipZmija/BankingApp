import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./style/App.css";
import NavBar from "./NavBar";
import Balance from "./Balance";
import Movements from "./Movements";
import Summary from "./Summary";
import Transfer from "./Operations/Transfer";
import Loan from "./Operations/Loan";
import CloseAccount from "./Operations/CloseAccount";
import User from "./context/User";
import SesionTimer from "./SesionTimer";

function App() {
	const [user, setUser] = useState(null);
	const [timerID, setTimerID] = useState([]);
	const [timer, setTimer] = useState({ minutes: 1, seconds: 0 });

	const startCountdown = (length) => {
		const deadline = new Date(Date.parse(new Date()) + length);

		const intervalID = setInterval(() => {
			const time = Date.parse(deadline) - Date.parse(new Date());
			const minutes = Math.floor((time / 1000 / 60) % 60);
			const seconds = Math.floor((time / 1000) % 60);
			if (time <= 0) clearInterval(intervalID);

			setTimer({ minutes, seconds });
		}, 1000);
	};

	const sessionTimedOut = () => {
		// sessionStorage.clear();
		setUser();
		timerID.forEach((id) => {
			console.log("clearing: " + id);
			clearTimeout(id);
		});
	};

	const login = (username, pin) => {
		timer && clearTimeout(timer);
		const object = { username, pin };
		const data = JSON.stringify(object);

		(async () => {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/login`,
				data,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const recivedData = JSON.parse(response.data.user);

			sessionStorage.setItem("username", recivedData.username);
			sessionStorage.setItem("token", recivedData.token);

			setUser(recivedData);

			startCountdown(60 * 1000 * recivedData.timeOutTime);
			const newTimerID = setTimeout(
				sessionTimedOut,
				60 * 1000 * recivedData.timeOutTime
			);
			setTimerID((prev) => {
				const array = [...prev];
				array.push(newTimerID);
				return array;
			});
		})();
	};

	const logout = (username, token) => {
		const object = { username, token };
		console.log(object);

		const data = JSON.stringify(object);
		(async () => {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/logout`,
				data,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			sessionStorage.removeItem("token");
			sessionStorage.removeItem("username");
			setUser();
		})();
	};

	useEffect(() => {
		timer && clearTimeout(timer);
		const token = sessionStorage.getItem("token");
		const username = sessionStorage.getItem("username");
		(async () => {
			if (username && token) {
				try {
					const response = await axios.get(
						`${process.env.REACT_APP_BASE_URL}/refresh/${username}/${token}`
					);
					const recivedData = JSON.parse(response.data.user);

					if (recivedData.isLogged) {
						setUser(recivedData);
						startCountdown(60 * 1000 * recivedData.timeOutTime);
						const newTimerID = setTimeout(
							sessionTimedOut,
							60 * 1000 * recivedData.timeOutTime
						);
						setTimerID((prev) => {
							const array = [...prev];
							array.push(newTimerID);
							return array;
						});
					}
				} catch (e) {
					console.log(e);
				}
			}
		})();
		return () =>
			timerID.forEach((id) => {
				console.log("clearing: " + id);
				clearTimeout(id);
			});
	}, []);

	return (
		<>
			<User.Provider value={{ user, setUser }}>
				<NavBar login={login} logout={logout}></NavBar>

				<div className={`${user?.isLogged ? "app" : "app-loggedout"}`}>
					{user?.isLogged && (
						<>
							<Balance balance={user.balance} />
							<Movements movements={user.movements} />
							<Summary
								income={user.income}
								outcome={user.outcome}
								interestRate={user.interestRate}
							/>
							<Transfer />
							<Loan />
							<CloseAccount />
							<SesionTimer timer={timer} />
						</>
					)}
				</div>
			</User.Provider>
		</>
	);
}

export default App;
