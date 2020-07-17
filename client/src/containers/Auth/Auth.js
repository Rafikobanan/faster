import React, { useState, useContext } from 'react';
import './Auth.scss';
import Button from '../../components/UI/Button/Button';
import { Context } from '../../context/context';
import useTranslate from '../../hooks/useTranslate/translate.hook';
import useHttp from '../../hooks/http.hook';
import { toast } from 'react-toastify';

function Auth() {
	const {language, auth} = useContext(Context);
	const t = useTranslate('Auth', language);
	const {request} = useHttp();
	const [isReg, setIsReg] = useState(true);
	const [form, setForm] = useState({
		email: '',
		password: '',
	});
	const [output, setOutput] = useState('');

	const loginHandler = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', {...form});
			if (data.message) {
				setOutput(data.message);
			} else {
				auth.login(data.token);
				setOutput('');
				toast.success(t['Successful authorization']);
			}
    } catch (e) {}
	};

	const registerHandler = async () => {
		if (!isValidEmail(form.email)) {
			setOutput(t['Incorrect email']);
			return;
		}

		if (!isValidPassword(form.password)) {
			setOutput(t['Minimum password length is 6 characters']);
			return;
		}

		try {
			const data = await request('/api/auth/register', 'POST', {...form});
			if (data.message) {
				setOutput(data.message);
			} else {
				auth.login(data.token);
				setOutput('');
				toast.success(t['Successful registration']);
			}
    } catch (e) {}
	};

	const toggleReg = () => {
		setIsReg(!isReg);
		setOutput('');
	};

	if (auth.token) {
		return (
			<div className="auth-auth">
				<div className="auth-auth__text">{t['You are logged in.']}</div>
				<Button onClick={() => auth.logout()}>{t['Log out']}</Button>
			</div>
		);
	}

	if (isReg) {
		return (
			<div className={'auth'}>
			<div className="auth-field auth__field">
				<div className="auth-field__title">{t['Registration']}</div>
				<input
					type="email"
					className="auth-field__input"
					placeholder={t['Email']}
					value={form.email}
					onChange={(e) => setForm({...form, email: e.target.value})}
				/>
				<input
					type="password"
					className="auth-field__input"
					placeholder={t['Password']}
					value={form.password}
					onChange={(e) => setForm({...form, password: e.target.value})}
				/>
				<Button
					className="auth-field__button"
					onClick={registerHandler}
				>
					{t['Sign up']}
				</Button>
				<div 
					className="auth-field__text"
					onClick={toggleReg}
				>
					{t['Already have an account']}
				</div>
				<div className="auth-field__output">
					{output}
				</div>
			</div>
		</div>
		);
	}
	return (
		<div className={'auth'}>
		<div className="auth-field auth__field">
			<div className="auth-field__title">{t['Authorization']}</div>
			<input
				type="email"
				className="auth-field__input"
				placeholder={t['Email']}
				value={form.email}
				onChange={(e) => setForm({...form, email: e.target.value})}
			/>
			<input
				type="password"
				className="auth-field__input"
				placeholder={t['Password']}
				value={form.password}
				onChange={(e) => setForm({...form, password: e.target.value})}
			/>
			<Button
				className="auth-field__button"
				onClick={loginHandler}
			>
				{t['Log in']}
			</Button>
			<div
				className="auth-field__text"
				onClick={toggleReg}
			>
				{t['Registration']}
			</div>
			<div className="auth-field__output">
				{output}
			</div>
		</div>
	</div>
	);
}

function isValidPassword(password) {
	if (password.trim().length < 6) return false;
	return true;
}

function isValidEmail(email) {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
}

export default Auth;
