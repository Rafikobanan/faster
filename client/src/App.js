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
import {INIT, CHANGE_LANGUAGE, SERVER_INIT} from './reducers/types';
import Statistics from './containers/Statistics/Statistics';
import About from './containers/About/About';
import Auth from './containers/Auth/Auth';
import { useAuth } from './hooks/auth.hook';
import useHttp from './hooks/http.hook';
import 'react-toastify/dist/ReactToastify.css';

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
		pageIndex: 1,
	});

	const auth = useAuth();
	const {request} = useHttp();

	useEffect(() => {
		async function fetchData() {
			try {
				const data = await request(
					'/api/data',
					'GET',
					null,
					{Authorization: `Bearer ${auth.token}`}
				);
				dispatch({type: SERVER_INIT, payload: data});
			} catch (e) {
				auth.logout();
			}
		}

		if (navigator.language !== 'ru') {
			dispatch({type: CHANGE_LANGUAGE, payload: 'en'});
		}

		dispatch({type: INIT});

		if (auth.token) {
			fetchData();
		}
		// eslint-disable-next-line 
	}, [auth.token]);
	

	useEffect(() => {
		storage({
			text: state.text,
			styles: {
				fontSize: state.styles.fontSize,
				fontFamily: state.styles.fontFamily,
				marginTop: state.styles.marginTop,
			},
			speed: state.speed,
			theme: state.theme,
			statistics: state.statistics,
			language: state.language,
		});
	}, [state.text, state.styles, state.speed, state.theme, state.statistics, state.language]);

  return (
		<Context.Provider value={{...state, state, dispatch, auth, request}}>
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
