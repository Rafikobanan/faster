import { CHANGE_TEXT, REMOVE_TEXT, PARSE_TEXT, CHANGE_FONT_SIZE, CHANGE_FONT_FAMILY, CHANGE_POSITION, CHANGE_SPEED, CHANGE_CURRENT_WORD } from "./types";

export default function(state, action) {
	switch (action.type) {
		case CHANGE_TEXT:
			return {
				...state,
				text: action.payload
			};

		case REMOVE_TEXT:
			return {
				...state,
				text: ''
			};

		case PARSE_TEXT:
			const parsedText = state.text.split(/[\s]/).filter(word => word).map(word => {
				const length = word.length;
				const letterInd = Math.round(length / 4);

				return {
					letterInd,
					word
				};
			});

			return {
				...state,
				parsedText,
				currentWord: parsedText[0]
			};

		case CHANGE_FONT_SIZE:
			return {
				...state,
				styles: {
					...state.styles,
					fontSize: state.styles.fontSize + action.payload
				}
			};

		case CHANGE_FONT_FAMILY:
			return {
				...state,
				styles: {
					...state.styles,
					fontFamily: action.payload
				}
			};

		case CHANGE_POSITION:
			if (action.payload < 0 && !state.styles.marginTop) return state;

			return {
				...state,
				styles: {
					...state.styles,
					marginTop: state.styles.marginTop + 60 * action.payload
				}
			};

		case CHANGE_SPEED:
			if (action.payload <= 0) {
				return {
					...state,
					speed: 1
				};
			}

			return {
				...state,
				speed: action.payload
			};

		case CHANGE_CURRENT_WORD:
			let currentIndex = state.currentIndex + action.payload;
			const parsedTextLastIndex = state.parsedText.length - 1;

			if (currentIndex < 0) currentIndex = 0;

			if (currentIndex > parsedTextLastIndex) currentIndex = parsedTextLastIndex;

			return {
				...state,
				currentWord: state.parsedText[currentIndex],
				currentIndex
			};

		default: 
			return state;
	}
};