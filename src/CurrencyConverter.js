import React, { useState, useEffect } from 'react';
import './App.css';
import RateDisplay from './RateDisplay';

const CurrencyConverter = () => {
    const currencyOptions = [
        "AED", "ARS", "AUD", "BGN", "BRL", "BSD", "CAD", "CHF",
        "CLP", "CNY", "COP", "CZK", "DKK", "DOP", "EGP", "EUR",
        "FJD", "GBP", "GTQ", "HKD", "HRK", "HUF", "IDR", "ILS",
        "INR", "ISK", "JPY", "KRW", "KZT", "MXN", "MYR", "NOK",
        "NZD", "PAB", "PEN", "PHP", "PKR", "PLN", "PYG", "RON",
        "RUB", "SAR", "SEK", "SGD", "THB", "TRY", "TWD", "UAH",
        "USD", "UYU", "VND", "ZAR"
    ];

    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [amountOne, setAmountOne] = useState(1);
    const [amountTwo, setAmountTwo] = useState(0);
    const [rate, setRate] = useState(0);

    useEffect(() => {
        fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
            .then(res => res.json())
            .then(data => {
                const rate = data.rates[toCurrency];
                setRate(rate);
                setAmountTwo((amountOne * rate).toFixed(2));
            });
    }, [fromCurrency, toCurrency, amountOne]);

    const handleAmountOneChange = (e) => {
        setAmountOne(e.target.value);
    };

    const handleFromCurrencyChange = (e) => {
        setFromCurrency(e.target.value);
    };

    const handleToCurrencyChange = (e) => {
        setToCurrency(e.target.value);
    };

    return (
        <div className="container">
            <div className="form-container from">
                <h2>From</h2>
                <label htmlFor="fromCurrency">Currency:</label>
                <select id="fromCurrency" value={fromCurrency} onChange={handleFromCurrencyChange}>
                    {currencyOptions.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
                <input type="number" id="amount-one" value={amountOne} onChange={handleAmountOneChange} />
            </div>
            <div className="form-container to">
                <h2>To</h2>
                <label htmlFor="toCurrency">Currency:</label>
                <select id="toCurrency" value={toCurrency} onChange={handleToCurrencyChange}>
                    {currencyOptions.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
                <input type="number" id="amount-two" value={amountTwo} readOnly />
            </div>
            <RateDisplay fromCurrency={fromCurrency} toCurrency={toCurrency} rate={rate} />
        </div>
    );
};

export default CurrencyConverter;
