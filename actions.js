
export const urlChanged = (state, url) => ({ ...state, url })

export const linkClicked = (state, location) => [state, pushUrl(location.pathname)]
