function getNormalDate() {
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	return `${day}:${month < 10 ? `0${month}`: month}:${year}`;
}

export default getNormalDate;