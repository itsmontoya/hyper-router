export const Lookup = (arr, key) => {
	const lookup = {};
	arr.forEach(item => lookup[item[key]] = item)
	return lookup;
};

export const MultiLookup = (arr, key) => {
	const lookup = {};
	arr.forEach(item => {
		const val = item[key]
		let arr = lookup[val];
		if (!arr) {
			arr = [];
			lookup[val] = arr;
		}

		arr.push(item);
	})

	return lookup;
};
