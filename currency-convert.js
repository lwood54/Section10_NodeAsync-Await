// 23 USD is worth 28 CAD. You can spend these in the following countries:
// list out all the countries that accept CAD.

const axios = require('axios');

const getExchangeRate = async function(from, to) {
    try {
        const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
        const rate =  response.data.rates[to];
        if (rate) {
            return rate;
        } else {
            throw new Error();
        }
    } catch (error) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
    }
}

const getCountries = async function(currencyCode) {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map(function(country) {
            return country.name;
        });
    } catch (error) {
        throw new Error(`Unable to get countries that use ${currencyCode}`);
    }
};

const convertCurrency = function(from, to, amount) {
    let countries;
    return getCountries(to).then(function(tempCountries) {
        countries = tempCountries;
        return getExchangeRate(from, to);
    }).then(function(rate) {
        const exchangedAmount = amount * rate;

        return `$${amount} ${from} is worth $${exchangedAmount} ${to}. $${to} can be used in the following countries: ${countries.join(',\n')}`;
    });
};

// convertCurrency('USD', 'CAD', 100).then(function(status) {
//     console.log(status);
// });

// Create convertCurrencyAlt as async function
// Get countries and rate using away and our two functions: var countries | var rate
// Calculate exchangedAmount
// Return status string

const convertCurrencyAlt = async function(from, to, amount) {
    const countries = await getCountries(to);
    const rate = await getExchangeRate(from, to);
    const exchangedAmount = amount * rate;
    return `$${amount} ${from} is worth $${exchangedAmount} ${to}. $${to} can be used in the following countries: ${countries.join(',\n')}`;
}

convertCurrencyAlt('USD', 'CAD', 100).then(function(output) {
    console.log(output);
}).catch(function(error) {
    console.log(error.message);
});
