import React from 'react';
import './Statistics.scss';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar} from 'recharts';
import {useContext} from 'react';
import {Context} from '../../context/context';
import {useMemo} from 'react';
import useTranslate from '../../hooks/useTranslate/translate.hook';

function Statistics() {
	const {readWords, language, time, theme} = useContext(Context);

	const t = useTranslate('Statistics', language);

	const normalDate = useMemo(() => {
		const date = new Date();
		const day = date.getDate();
		const month = date.getMonth();
		const year = date.getFullYear();

		return `${day}:${month < 10 ? `0${month}`: month}:${year}`;
	}, []);

	const wordsData = useMemo(() => {
		return [
			{
				'date': normalDate,
				'words': readWords,
			},
		];
	}, [readWords, normalDate]);

	const timeData = useMemo(() => {
		return [
			{
				'date': normalDate,
				'minutes': Math.floor(time / 60),
			},
		];
	}, [time, normalDate]);

	return (
		<div className={`statistics ${theme}`}>
			<h2 className="statistics__title">{t['Number of words read']}</h2>

			<BarChart width={730} height={250} data={wordsData} maxBarSize={50}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="date" />
				<YAxis />
				<Tooltip />
				<Bar dataKey="words" fill="#82ca9d" />
			</BarChart>

			<h2 className="statistics__title">{t['Reading time']}</h2>

			<BarChart width={730} height={250} data={timeData} maxBarSize={50}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="date" />
				<YAxis />
				<Tooltip />
				<Bar dataKey="minutes" fill="#82ca9d" />
			</BarChart>
		</div>
	);
}

export default Statistics;
