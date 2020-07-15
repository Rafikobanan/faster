import React from 'react';
import './Statistics.scss';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer} from 'recharts';
import {useContext} from 'react';
import {Context} from '../../context/context';
import {useMemo} from 'react';
import useTranslate from '../../hooks/useTranslate/translate.hook';
import getNormalDate from '../../functions/getNormalDate';

function Statistics() {
	const {statistics, language} = useContext(Context);

	const t = useTranslate('Statistics', language);

	const wordsData = useMemo(() => {
		if (Object.keys(statistics).length === 0) {
			return [
				{
					'date': getNormalDate(),
					'words': 0
				}
			];
		}
		return Object.keys(statistics).map((key) => {
			const obj = {};
			obj['date'] = key;
			obj['words'] = statistics[key].readWords;
			return obj;
		});
	}, [statistics]);

	const timeData = useMemo(() => {
		if (Object.keys(statistics).length === 0) {
			return [
				{
					'date': getNormalDate(),
					'minutes': 0
				}
			];
		}
		return Object.keys(statistics).map((key) => {
			const obj = {};
			obj['date'] = key;
			obj['minutes'] = Math.floor(statistics[key].time / 60);
			return obj;
		});
	}, [statistics]);

	return (
		<div className={'statistics'}>
			<h2 className="statistics__title">{t['Number of words read']}</h2>

		<ResponsiveContainer width="100%" height={450}>
			<BarChart data={wordsData} margin={{right: 30}}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="date" />
				<YAxis />
				<Tooltip />
				<Bar dataKey="words" fill="#82ca9d" />
			</BarChart>
		</ResponsiveContainer>

			<h2 className="statistics__title">{t['Reading time']}</h2>

		<ResponsiveContainer width="100%" height={450}>
			<BarChart data={timeData} margin={{right: 30}}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="date" />
				<YAxis />
				<Tooltip />
				<Bar dataKey="minutes" fill="#82ca9d" />
			</BarChart>
		</ResponsiveContainer>
		</div>
	);
}

export default Statistics;
