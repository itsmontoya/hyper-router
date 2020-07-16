import { getURLParts } from "./url.js"

// Route represents the route type
export function Route({ title = "", name = "", url = "", component = "" }) {
	this.title = title;
	this.name = name;
	this.url = url;
	this.component = component;
	this.parts = getURLParts(url);
}

Route.prototype.GetParams = function (parts) {
	if (this.parts.length !== parts.length) {
		return null;
	}

	var params = {};
	const ended = this.parts.some((routePart, i) => {
		const part = parts[i];
		if (routePart === part) {
			return;
		}

		if (routePart[0] === ":") {
			params[routePart.substr(1)] = part;
			return;
		}

		// This is not a match, end early
		return true;
	});

	if (ended) {
		return null;
	}

	return params;
}

Route.prototype.GetMatch = (parts) => {
	const params = this.GetParams(parts);
	if (params === null) {
		return null;
	}

	return { route: this, params: params }
};
