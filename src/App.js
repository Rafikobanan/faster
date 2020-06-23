import React, {useReducer} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Insert from './containers/Insert/Insert';
import Current from './containers/Current/Current';
import { TextContext } from './context/textContext';
import { ThemeContext } from './context/themeContext';
import textReducer from './reducers/textReducer';
import themeReducer from './reducers/themeReducer';

function App() {
	const [textState, textDispatch] = useReducer(textReducer, {
		text: '',
		parsedText: [],
		styles: {
			fontSize: 24,
			fontFamily: 'Verdana',
			marginTop: 0,
		},
		speed: 300
	});

	const [themeState, themeDispatch] = useReducer(themeReducer, '');

  return (
		<ThemeContext.Provider value={{
			theme: themeState, themeDispatch
		}}>
			<TextContext.Provider value={{
				text: textState.text, styles: textState.styles, speed: textState.speed, textDispatch
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
