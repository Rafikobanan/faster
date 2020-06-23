import { TOGGLE_THEME } from "./types";

export default function(state, payload) {
	switch (payload.type) {
		case TOGGLE_THEME:
			if (!state) return 'dark';
			return '';
		default:
			return state;
	}
}