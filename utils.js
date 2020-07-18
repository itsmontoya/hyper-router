export const wrap = (subFn, action) => (...args) => [action, subFn(args)];
export const subFn = ([action]) => ({ action });
