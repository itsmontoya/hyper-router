import { getRouteMatch } from "./router.js";
import { routeChanged } from "./actions.js";
import { effect } from "./utils.js";

export const pushUrl = (state, props) => {
	history.pushState({}, props.title, props.url);
	// Return unmodified state
	return setCurrentRoute(state);
}

// Effects
export const setCurrentRoute = state => {
	// Set path as current location path
	const path = document.location.pathname
	// Get route match for current path
	const match = getRouteMatch(path);

	// Check to see if match exists
	if (match === null) {
		// Route match not found, throw error
		throw (`404: cannot find route match for ${path}`)
	}

	return effect(state, routeChanged, match);
}
