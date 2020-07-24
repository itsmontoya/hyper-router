import { wrap, subFn } from "./utils.js";

const listenerTypes = ["popstate", "hyperapp-pushstate"];

const dispatchPopState = (dispatch, { action }) => {
	const popstate = _ => dispatch(action, location.href)
	addEventListeners(popstate);
	return () => removeEventListeners(popstate)
};

const addEventListeners = popstate => listenerTypes
	.forEach(listener => addEventListener(listener, popstate));

const removeEventListeners = popstate => listenerTypes
	.forEach(listener => removeEventListener(listener, popstate));

export const onUrlChange = wrap(subFn, dispatchPopState);
