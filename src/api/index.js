const API_URL = 'https://api.coingecko.com/api/v3/coins';

export const makeRequest = (params) => {
  const {path, headers, ...restParams} = params;
  return fetch(`${API_URL}${path}`, {
    ...restParams,
    headers: {
      Accept: 'application/json',
      ...headers,
    },
  });
};
