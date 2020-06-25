import React, {useReducer} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Insert from './containers/Insert/Insert';
import Current from './containers/Current/Current';
import { TextContext } from './context/textContext';
import { ThemeContext } from './context/themeContext';
import textReducer from './reducers/textReducer';
import themeReducer from './reducers/themeReducer';
import CurrentWord from './containers/CurrentWord/CurrentWord';

function App() {
	const [textState, textDispatch] = useReducer(textReducer, {
		text: '',
		parsedText: [],
		styles: {
			fontSize: 24,
			fontFamily: 'Verdana',
			marginTop: 0,
		},
		speed: 300,
		currentWord: {letterInd: 0, word: ''},
		currentIndex: 0,
	});

	const [themeState, themeDispatch] = useReducer(themeReducer, '');

  return (
		<ThemeContext.Provider value={{
			theme: themeState, themeDispatch
		}}>
			<TextContext.Provider value={{
				text: textState.text, styles: textState.styles, speed: textState.speed, 
				parsedText: textState.parsedText, currentWord: textState.currentWord, currentIndex: textState.currentIndex,
				textDispatch
			}}>
			<Switch>
				<Layout>
					<Route path="/current" component={Current} />
					<Route path="/current-word" component={CurrentWord} />
					<Route path="/" exact component={Insert} />
					<Redirect to="/" component={Insert} />
				</Layout>
			</Switch>
			</TextContext.Provider>
		</ThemeContext.Provider>
  );
}

export default App;
