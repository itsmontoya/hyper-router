import { Lookup } from "./lookupTable.js";
import { Route } from "./route.js";
import { getURLParts } from "./url.js";

let routesState = [],
	routesByName = {};

export function getRouteByName(name) {
	return routesByName[name]
}

export function getRouteMatch(url) {
	const parts = getURLParts(url);
	let match = null;
	routesState.some(route => {
		match = route.getMatch(parts);
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
