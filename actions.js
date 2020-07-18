export const routeChanged = (state, match) => ({
	...state,
	currentRoute: match.route,
	currentParams: match.params
})

export const linkClicked = (state, location) => [state, pushUrl(location.pathname)]
