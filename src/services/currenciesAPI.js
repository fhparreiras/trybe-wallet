const getCurrencies = async () => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const requestJson = await request.json();
  const result = ['BRL', ...Object.keys(requestJson)];
  return result;
};

export default getCurrencies;
