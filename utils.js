export const wrap = (subFn, action) => (...args) => [action, subFn(args)];
export const subFn = ([action]) => ({ action });

export const effect = (state, action, props) => [
	state,
	sub(action, props),
];

export const sub = (action, props) => [(dispatch, props) => dispatch(action, props), props];

export const deferredAction = (action, props) => [action, props];