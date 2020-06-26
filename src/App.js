import React, {useReducer} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Insert from './containers/Insert/Insert';
import Current from './containers/Current/Current';
import { Context } from './context/context';
import reducer from './reducers/reducer';
import CurrentWord from './containers/CurrentWord/CurrentWord';
import { useEffect } from 'react';
import storage from './storage/storage';
import { INIT } from './reducers/types';
import Statistics from './containers/Statistics/Statistics';

function App() {
	const [state, dispatch] = useReducer(reducer, {
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
		theme: ''
	});

	useEffect(() => {
		dispatch({type: INIT});
	}, []);

	useEffect(() => {
		storage(state);
	}, [state]);

  return (
		<Context.Provider value={{...state, dispatch}}>
			<Switch>
				<Layout>
					<Route path="/statistics" component={Statistics}/>
					<Route path="/current" component={Current} />
					<Route path="/current-word" component={CurrentWord} />
					<Route path="/" exact component={Insert} />
					<Redirect to="/" component={Insert} />
				</Layout>
			</Switch>
		</Context.Provider>
  );
}

export default App;
