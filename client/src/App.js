import React, {useReducer} from 'react';
import {Switch, Route} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Insert from './containers/Insert/Insert';
import Current from './containers/Current/Current';
import {Context} from './context/context';
import reducer from './reducers/reducer';
import CurrentWord from './containers/CurrentWord/CurrentWord';
import {useEffect} from 'react';
import storage from './storage/storage';
import {INIT} from './reducers/types';
import Statistics from './containers/Statistics/Statistics';
import About from './containers/About/About';
import Auth from './containers/Auth/Auth';
import { useAuth } from './hooks/auth.hook';
import useHttp from './hooks/http.hook';

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
		theme: '',
		statistics: {},
		language: 'ru',
	});

	const auth = useAuth();
	const {request} = useHttp();

	useEffect(() => {
		dispatch({type: INIT});
	}, []);

	useEffect(() => {
		storage(state);
	}, [state]);

	useEffect(() => {
		if (auth.token) {
			request(
				'/api/statistics',
				'POST', 
				state.statistics,
				{Authorization: `Bearer ${auth.token}`}
			);
		}
	}, [state.statistics, auth.token]);

  return (
		<Context.Provider value={{...state, dispatch, auth}}>
			<Switch>
				<Layout>
					<Route exact path="/" component={Insert} />
					<Route exact path="/statistics" component={Statistics}/>
					<Route exact path="/current-word" component={CurrentWord} />
					<Route exact path="/current" component={Current} />
					<Route exact path="/about" component={About} />
					<Route exact path="/auth" component={Auth} />
				</Layout>
			</Switch>
		</Context.Provider>
  );
}

export default App;
