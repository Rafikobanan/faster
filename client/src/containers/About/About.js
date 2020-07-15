import React from 'react';
import './About.scss';
import {useContext} from 'react';
import {Context} from '../../context/context';
import useTranslate from '../../hooks/useTranslate/translate.hook';

function About() {
	const {language} = useContext(Context);
	const t = useTranslate('About', language);

	return (
		<div className={'about'}>
			<h2 className="about__title">{t['What is it?']}</h2>
			<p className="about__paragraph">{t['RSVP reader']}</p>
			<p className="about__paragraph">
				{t['This is an application to increase reading speed.']}
			</p>
			<h2 className="about__title">{t['How it works?']}</h2>
			<p className="about__paragraph">
				{t['Just paste the text and run. ' +
				'When reading, you will not spend time on ' +
				'eye movement and regression.']}
			</p>
			<h2 className="about__title">{t['How much will this help me?']}</h2>
			<p className="about__paragraph">
				{t['You can increase the speed of reading by 33% without ' +
				'a significant loss of understanding of the text.']}
			</p>
		</div>
	);
}

export default About;
