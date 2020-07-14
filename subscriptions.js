import { wrap } from "./ utils.js";

const listenerTypes = ["popstate", "hyperapp-pushstate"];
const subFn = ([action]) => ({ action });

export const onUrlChange = wrap(subFn, dispatchPopState);
export const onUrlRequest = wrap(subFn, dispatchUrlRequest);

const dispatchPopState = (dispatch, { action }) => {
	const popstate = _ => dispatch(action, location.href)
	addEventListeners(popstate);
	return () => removeEventListeners(popstate)
};

const dispatchUrlRequest = (dispatch, { action }) => {
	const onClick = onClickHandler(dispatch, action);
	addEventListener("click", onClick)
	return () => removeEventListener("click", onClick)
};

const onClickHandler = (dispatch, action) => evt => {
	if (!isClickEvent(evt)) {
		return;
	}

	evt.preventDefault()
	dispatch(action, { url: evt.target.getAttribute("href") })
};

const addEventListeners = popstate => listenerTypes
	.forEach(listener => addEventListener(listener, popstate));

const removeEventListeners = popstate => listenerTypes
	.forEach(listener => removeEventListener(listener, popstate));

function isClickEvent(evt) {
	return !evt.ctrlKey &&
		!evt.metaKey &&
		!evt.shiftKey &&
		evt.target.matches("a")
}
