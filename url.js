export function getURLParts(url) {
	const parts = [];
	url.split("/").forEach((part) => {
		if (part.length === 0) {
			return;
		}

		parts.push(part);
	});

	return parts;
}

export function getParams(route, parts) {
	if (route.parts.length !== parts.length) {
		return null;
	}

	var params = {};
	const ended = route.parts.some((routePart, i) => {
		const part = parts[i];
		if (routePart === part) {
			return;
		}

		if (routePart[0] === ":") {
			params[routePart.substr(1)] = part;
			return;
		}

		return true;
	})

	if (ended) {
		return null;
	}

	return {};
}
