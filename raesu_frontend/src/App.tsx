import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as NoteAPI from "./api/api";
import Login from './components/Login';
import SignUp from './components/SignUp';
import TopBar from './components/TopBar';
import User from './models/user';
import { Container } from 'react-bootstrap';
import MainPage from './pages/MainPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FourOhFour from './pages/FourOhFour';
import css from './css/App.module.css';

function App() {
	const [currUser, setCurrUser] = useState<User|null>(null);
	const [showSignUp, setShowSignUp] = useState(false);
	const [showLogin, setShowLogin] = useState(false);

	useEffect(() => {
		async function retrieveCurrUser() {
			try {
				const user = await NoteAPI.retrieveCurrentUser();
				setCurrUser(user);
			} catch (err) {
				console.error(err);
			}
		}
		retrieveCurrUser();
	}, []);

	return (
		<BrowserRouter>
			<div>
				<TopBar
				currUser={currUser}
				onRegisterClick={() => setShowSignUp(true)}
				onLoginClick={() => setShowLogin(true)}
				onLogoutSuccess={() => setCurrUser(null)}
				/>
				<Container className={css.mainContainer}>
					<Routes>
						<Route
							path='/'
							element={<MainPage currUser={currUser} />}
						/>
						<Route
							path='/privacy'
							element={<PrivacyPolicy />}
						/>
						<Route
							path='/*'
							element={<FourOhFour />}
						/>
					</Routes>
				</Container>
					{ showSignUp &&
						<SignUp
						onDismiss={() => setShowSignUp(false)}
						onSignUpSuccess={(user) => {
							setCurrUser(user);
							setShowSignUp(false);
						}}
						/>
					}

					{ showLogin &&
						<Login
						onDismiss={() => setShowLogin(false)}
						onLoginSuccess={(user) => {
							setCurrUser(user);
							setShowLogin(false);
						}}
						/>
					}
			</div>
		</BrowserRouter>
	)
}

export default App
