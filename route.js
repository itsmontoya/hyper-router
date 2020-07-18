import { getURLParts } from "./url.js"

// Route represents the route type
export function Route({ title = "", name = "", url = "", component = "" }) {
	const self = this;
	this.title = title;
	this.name = name;
	this.url = url;
	this.component = component;
	this.parts = getURLParts(url);

	this.getMatch = parts => getMatch(self, parts);
	this.getParams = parts => getParts(self, parts);
}

export function Match(route, params) {
	this.route = route;
	this.params = params;
}

function getMatch(route, parts) {
	const params = route.getParams(parts);
	if (params === null) {
		return null;
	}

	return new Match(route, params);
}

function getParts(route, parts) {
	if (route.parts.length !== parts.length) {
		// The length of the parts differ, return
		return null;
	}

	const params = {};
	const iteratingFn = (routePart, i) => appendParam(params, routePart, parts[i])
	const ended = route.parts.some(iteratingFn);
	if (ended) {
		return null;
	}

	return params;
}

function appendParam(params, routePart, part) {
	if (routePart === part) {
		// This is a direct match, return
		return;
	}

	if (routePart[0] === ":") {
		// Set key as the route part with the colon shifted off the front
		const key = routePart.substr(1)
		// Set part as the param value for the target key
		params[key] = part;
		return;
	}

	// This is not a match, end early
	return true;
}