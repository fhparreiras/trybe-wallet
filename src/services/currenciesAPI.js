export const getCurrencies = async () => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const requestJson = await request.json();
  const result = [...Object.keys(requestJson)];
  return result;
};

export const getCurrenciesData = async () => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const requestJson = await request.json();
  return requestJson;
};
