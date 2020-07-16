import { GetURLParts } from "./url.js";
import { Lookup } from "./lookupTable.js";
import { Route } from "./route.js";

let routesState = [],
	routesByName = {};

export function getRouteByName(name) {
	return routesByName[name]
}

export function getRouteMatch(url) {
	const parts = getURLParts(url);
	let match = null;
	routes.some(route => {
		match = route.GetMatch(parts);
		return match != null;
	})

	return match;
}

export function setRoutes(routes) {
	const prepared = [];
	// Set parts for each route
	routes.forEach(route => prepared.push(new Route(route)))
	// Assign new lookup table to name lookup
	routesByName = Lookup(prepared, "name");
	// Assign prepared to r
	routesState = prepared;
}

export function navigate(state, props) {
	// Push to browser history
	history.pushState({}, props.title, props.url);
	// Return SetCurrentRoute action
	return SetCurrentRoute(state, props);
}

// Effects
export const setCurrentRoute = (state, props) => {
	// Set path as current location path
	const path = document.location.pathname
	// Get route match for current path
	const match = GetRouteMatch(path);
	// Check to see if match exists
	if (match === null) {
		// Route match not found, throw error
		throw (`404: cannot find route match for ${path}`)
	}

	// Create new state with updated route
	return [
		{ ...state, currentRoute: match.route },
		[dispatch => routeChanged, match]
	];
}
