const generateToken = function (len) {
	const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
	let token = "";
	for (let i = 0; i < len; i++) {
		const randomIndex = Math.floor(Math.random() * chars.length);
		token += chars[randomIndex];
	}
	console.log(token);
	return token;
};

class Account {
	constructor({ owner, movements, interestRate, pin }) {
		this.owner = owner;
		this.movements = movements;
		this.interestRate = interestRate;
		this.username = this.owner
			.toLowerCase()
			.split(" ")
			.map((item) => item[0])
			.join("");
		this.pin = pin;
		this.isLogged = false;
		this.token = "";
		this.refreshToken = "";
		this.income = this.calculateIncomeOrOutcome(-1);
		this.outcome = this.calculateIncomeOrOutcome(1);
		this.balance = this.calculateBalance();
		this.timeOutID;
		this.timeOutTime = 1 / 4;
	}

	reportMovement(movement) {
		this.movements.push(movement);
		this.income = this.calculateIncomeOrOutcome(-1);
		this.outcome = this.calculateIncomeOrOutcome(1);
		this.balance = this.calculateBalance();
	}

	clearingSessionTimeout() {
		console.log("session renewed", this.timeOutID);
		clearTimeout(this.timeOutID);
	}
	sessionTimeout() {
		this.clearingSessionTimeout();
		this.timeOutID = setTimeout(() => {
			console.log("logging out");
			this.logout();
		}, 1000 * 60 * this.timeOutTime);
	}

	login(pin) {
		if (this.pin == pin) {
			this.token = generateToken(20);
			this.refreshToken = generateToken(30);
			this.isLogged = true;
			this.sessionTimeout();
		} else {
			this.isLogged = false;
		}
		console.log(this.isLogged);
		return this.isLogged;
	}

	logout() {
		this.token = null;
		this.isLogged === false;
		return this.isLogged;
	}

	calculateIncomeOrOutcome(positiveOrNegative) {
		return this.movements.reduce((acc, curr) => {
			if (curr.value * positiveOrNegative < 0) return acc + curr.value;
			else return acc;
		}, 0);
	}

	calculateBalance() {
		return this.income + this.outcome;
	}

	get userData() {
		if (this.isLogged) {
			return {
				owner: this.owner,
				movements: this.movements,
				token: this.token,
				refreshToken: this.refreshToken,
				interestRate: this.interestRate,
				username: this.username,
				isLogged: this.isLogged,
				balance: this.balance,
				income: this.income,
				outcome: this.outcome,
				timeOutTime: this.timeOutTime,
			};
		} else
			return {
				token: this.token,
				isLogged: this.isLogged,
			};
	}
}

const account1 = {
	owner: "Jonas Schmedtmann",
	movements: [
		{
			type: "deposit",
			date: "20/05/2023",
			value: 200,
			currency: "$",
		},
		{
			type: "deposit",
			date: "21/05/2023",
			value: 450,
			currency: "$",
		},
		{
			type: "withdrawal",
			date: "22/05/2023",
			value: -400,
			currency: "$",
		},
		{
			type: "deposit",
			date: "24/05/2023",
			value: 3000,
			currency: "$",
		},
		{
			type: "withdrawal",
			date: "26/05/2023",
			value: -650,
			currency: "$",
		},
		{
			type: "withdrawal",
			date: "28/05/2023",
			value: -130,
			currency: "$",
		},
		{
			type: "deposit",
			date: "30/05/2023",
			value: 70,
			currency: "$",
		},
		{
			type: "deposit",
			date: "1/06/2023",
			value: 1300,
			currency: "$",
		},
	],
	interestRate: 1.2, // %
	pin: 1111,
};

const account2 = {
	owner: "Jessica Davis",
	movements: [
		{
			type: "deposit",
			date: "20/05/2023",
			value: 2000,
			currency: "$",
		},
		{
			type: "deposit",
			date: "21/05/2023",
			value: 40,
			currency: "$",
		},
		{
			type: "withdrawal",
			date: "22/05/2023",
			value: -40,
			currency: "$",
		},
		{
			type: "deposit",
			date: "24/05/2023",
			value: 300,
			currency: "$",
		},
		{
			type: "withdrawal",
			date: "26/05/2023",
			value: -650,
			currency: "$",
		},
		{
			type: "withdrawal",
			date: "28/05/2023",
			value: -1300,
			currency: "$",
		},
		{ type: "deposit", date: "30/05/2023", value: 700, currency: "$" },
		{
			type: "deposit",
			date: "1/06/2023",
			value: 1300,
			currency: "$",
		},
	],
	interestRate: 1.5,
	pin: 2222,
};

const account3 = {
	owner: "Steven Thomas Williams",
	movements: [
		{
			type: "deposit",
			date: "20/05/2023",
			value: 200,
			currency: "$",
		},
		{
			type: "deposit",
			date: "21/05/2023",
			value: 450,
			currency: "$",
		},
		{
			type: "withdrawal",
			date: "22/05/2023",
			value: -800,
			currency: "$",
		},
		{
			type: "deposit",
			date: "24/05/2023",
			value: 1000,
			currency: "$",
		},
		{
			type: "withdrawal",
			date: "26/05/2023",
			value: -450,
			currency: "$",
		},
		{
			type: "withdrawal",
			date: "28/05/2023",
			value: -10,
			currency: "$",
		},
		{ type: "deposit", date: "30/05/2023", value: 700, currency: "$" },
		{
			type: "deposit",
			date: "1/06/2023",
			value: 100,
			currency: "$",
		},
	],
	interestRate: 0.7,
	pin: 3333,
};

const account4 = {
	owner: "Sarah Smith",
	movements: [
		{
			type: "deposit",
			date: "20/05/2023",
			value: 2000,
			currency: "$",
		},
		{
			type: "deposit",
			date: "21/05/2023",
			value: 40,
			currency: "$",
		},
		{
			type: "withdrawal",
			date: "22/05/2023",
			value: -4000,
			currency: "$",
		},
		{
			type: "deposit",
			date: "24/05/2023",
			value: 300,
			currency: "$",
		},
		{
			type: "withdrawal",
			date: "26/05/2023",
			value: -65,
			currency: "$",
		},
		{
			type: "withdrawal",
			date: "28/05/2023",
			value: -1300,
			currency: "$",
		},
		{ type: "deposit", date: "30/05/2023", value: 70, currency: "$" },
		{
			type: "deposit",
			date: "1/06/2023",
			value: 1300,
			currency: "$",
		},
	],
	interestRate: 1,
	pin: 4444,
};

const users = [account1, account2, account3, account4];

const initiateUsers = function (users) {
	return users.map((user) => new Account(user));
};

const accounts = initiateUsers(users);

module.exports = { accounts, Account };
