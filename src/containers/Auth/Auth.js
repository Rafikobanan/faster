import React, { useState, useContext } from 'react';
import './Auth.scss';
import Button from '../../components/UI/Button/Button';
import { Context } from '../../context/context';
import useTranslate from '../../hooks/useTranslate/translate.hook';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';

function Auth() {
	const {theme, language} = useContext(Context);
	const t = useTranslate('Auth', language);
	const [isAuth, setIsAuth] = useState(firebase.auth().currentUser);
	const [isReg, setIsReg] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [output, setOutput] = useState('');

	const logout = () => {
		firebase.auth().signOut().then(function() {
			setIsAuth(false);
		});
	};

	const changeOutput = (text) => {
		if (text) {
			setOutput(text);
			return;
		}
		setOutput(<Redirect path="/"/>);
	};

	const registration = () => {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(() => {
				changeOutput('');
			})
			.catch((error) => {
				const errorMessage = error.message;
				changeOutput(errorMessage);
		});
	};

	const login = () => {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(() => {
				changeOutput('');
			})
			.catch(function(error) {
				const errorMessage = error.message;
				changeOutput(errorMessage);
			});
	}

	const regHandler = () => {
		if (!validateEmail(email)) {
			changeOutput(t['Invalid email']);
			return;
		}

		if (!validatePassword(password)) {
			changeOutput(t['Minimum password length is 6 characters']);
			return;
		}

		registration();
	};

	const loginHandler = () => {
		login();
	};

	return (
		<div className={`auth ${theme}`}>
			{isAuth ? (
				<>
					<div>t['You are already logged in']</div>
					<Button onClick={logout}>{t['Log out']}</Button>
				</>
				) :
			<div className="auth-field auth__field">
				<div className="auth-field__title">{isReg ? t['Registration'] : t['Authorization']}</div>
				<input
					type="email"
					className="auth-field__input"
					placeholder={t['Email']}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					className="auth-field__input"
					placeholder={t['Password']}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button
					className="auth-field__button"
					onClick={isReg ? regHandler : loginHandler}
				>
					{isReg ? t['Sign up'] : t['Log in']}
				</Button>
				<Button
					className="auth-field__button"
					theme="grey"
					onClick={() => setIsReg(!isReg)}
				>
					{isReg ? t['Log in'] : t['Sign up']}
				</Button>
				<div className="auth-field__output">
					{output}
				</div>
			</div>
			}
		</div>
	);
}

function validateEmail(email) {
	const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validatePassword(password) {
	return password.trim().length >= 6;
}

export default Auth;
