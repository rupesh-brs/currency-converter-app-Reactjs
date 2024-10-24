
import React from 'react';
import './App.css'

const RateDisplay = ({ fromCurrency, toCurrency, rate }) => {
    return (
        <div id="rate">
            {fromCurrency} to {toCurrency}: 1 {fromCurrency} = {rate} {toCurrency}
        </div>
    );
};

export default RateDisplay;
