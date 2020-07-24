export const routeChanged = (state, match) => ({
	...state,
	currentRoute: match.route,
	currentParams: match.params
});

