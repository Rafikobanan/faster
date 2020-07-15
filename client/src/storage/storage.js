export default function storage(data) {
	if (data) {
		localStorage.setItem('data', JSON.stringify(data));
		return;
	}

	return JSON.parse(localStorage.getItem('data')) || null;
}
