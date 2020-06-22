import React, {useState} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Insert from './containers/Insert/Insert';
import Current from './containers/Current/Current';
import { TextContext } from './context/textContext';
import { ThemeContext } from './context/themeContext';

function App() {
	const [text, setText] = useState('');

	const changeText = e => {
		setText(e.target.value);
	};

	const removeText = () => {
		setText('');
	};

	const [theme, setTheme] = useState('');

	const changeTheme = () => {
		if (theme) {
			setTheme('');
		} else {
			setTheme('dark');
		}
	};

  return (
		<ThemeContext.Provider value={{
			theme, changeTheme
		}}>
			<TextContext.Provider value={{
				text, changeText, removeText
			}}>
			<Switch>
				<Layout>
					<Route path="/current" component={Current}/>
					<Route path="/" exact component={Insert}/>
					<Redirect to="/" component={Insert} />
				</Layout>
			</Switch>
			</TextContext.Provider>
		</ThemeContext.Provider>
  );
}

export default App;
