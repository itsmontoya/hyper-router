
export const routeChanged = (state, route) => ({ ...state, route })

export const linkClicked = (state, location) => [state, pushUrl(location.pathname)]
