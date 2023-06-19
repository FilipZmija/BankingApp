const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const { accounts, Account } = require("./users.js");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "http://localhost:3000",
	})
);

app.get("/refresh/:username/:token", (req, res) => {
	const { username, token } = req.params;
	const account = accounts.filter(
		(account) => account.username == username && account.token == token
	);
	if (account[0]) account[0].sessionTimeout();
	const user =
		JSON.stringify(account[0]?.userData) ||
		JSON.stringify({
			message: "Session has expired please log in!",
			isLogged: false,
		});
	res.send({ user });
});

app.post("/login", (req, res) => {
	const { username, pin } = req.body;
	const account = accounts.filter(
		(account) => account.username === username && account.login(pin)
	);
	const user = JSON.stringify(account[0].userData);

	res.send({ user });
});

app.post("/logout", (req, res) => {
	const { username, token } = req.body;
	const account = accounts.filter(
		(account) =>
			account.username === username &&
			account.token === token &&
			account.logout()
	);
	const user = JSON.stringify({ isLogged: false, token: null });
	res.send({ user });
});

app.post("/transfer", (req, res) => {
	const { username, token, amount } = req.body;
	const account = accounts.filter(
		(account) => account.username === username && account.token == token
	);
	account.reportMovement(-1 * amount);

	const user = JSON.stringify(account[0].userData);
	res.send({ user });
});

app.post("/loan", (req, res) => {
	const { username, token, amount } = req.body;
	const account = accounts.filter(
		(account) => account.username === username && account.token == token
	);
	account.reportMovement(amount);

	const user = JSON.stringify(account[0].userData);
	res.send({ user });
});

app.post("/newUser", (req, res) => {
	const userData = JSON.parse(req.body);

	const newAccount = new Account(userData);
	accounts.push(newAccount);
	const data = res.send({ users: JSON.stringify(accounts) });
});

app.listen(3001, () => {
	console.log("Server listening on port 3001");
});
