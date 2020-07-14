import { wrap } from "./ utils.js";

const subFn = ([url]) => ({ url });

export const pushUrl = wrap(
	subFn,
	(_, { url }) => dispatchPushUrl(url)
);

const dispatchPushUrl = url => {
	history.pushState({}, "", url)
	dispatchEvent(new CustomEvent("hyperapp-pushstate"))
}