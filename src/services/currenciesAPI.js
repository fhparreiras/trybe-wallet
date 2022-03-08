export const getCurrencies = async () => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const requestJson = await request.json();
  const filterCurrencies = Object.keys(requestJson).filter((currency) => (
    currency !== 'USDT'));
  const result = [...filterCurrencies];
  return result;
};

export const getCurrenciesData = async () => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const requestJson = await request.json();
  return requestJson;
};
