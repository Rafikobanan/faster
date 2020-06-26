import './Hint.scss';
import useEventListener from '../event.hook';
import { useRef } from 'react';
import { useEffect } from 'react';

function removeHint(ref) {
	if (ref.current) {
		ref.current.remove();
		ref.current = null;
	}
}

function useHint() {
	const hintEl = useRef();

	useEffect(() => {
		return () => {
			removeHint(hintEl);
		};
	}, []);

	useEventListener('mouseover', e => {
		const target = e.target.closest('[data-hint]');

		if (!target) return;

		const hintText = target.dataset.hint;

		if (!hintText) return;

		const hint = document.createElement('div');
		hint.className = 'hint';
		hint.innerHTML = hintText;
		document.body.append(hint);

		hintEl.current = hint;

		const coords = target.getBoundingClientRect();

		let left = coords.left + (target.offsetWidth - hint.offsetWidth) / 2;

		if (left < 0) left = 0;

		let top = coords.top + target.offsetHeight + 5;
		
		hint.style.left = left + 'px';
		hint.style.top = top + 'px';
	});

	useEventListener('mouseout', e => {
		removeHint(hintEl);
	});
}

export default useHint;