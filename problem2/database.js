const API_URL_CRYPTO = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano,dogecoin,solana,ripple,polkadot,litecoin,chainlink,worldcoin,binancecoin,monero,polygon,shiba-inu,uniswap,tezos,cosmos,vechain,stellar,quant&vs_currencies=usd";
const API_URL_FOREX = "https://open.er-api.com/v6/latest/USD";
const API_URL_METALS = "https://api.metalpriceapi.com/v1/latest?api_key=af8c6567ee705438f280153bb058c39e&base=USD&currencies=EUR,XAU,XAG";


let currencyData = [
    // 32 Cryptocurrencies
    { name: 'USD Coin', code: 'USDC', icon: 'tokens/USDC.svg', price: 1 },
    { name: 'Bitcoin', code: 'BTC', icon: 'tokens/BTC.svg', price: 96614.93 },
    { name: 'Ethereum', code: 'ETH', icon: 'tokens/ETH.svg', price: 2681.57 },
    { name: 'Cardano', code: 'ADA', icon: 'tokens/ADA.svg', price: 0.72 },
    { name: 'Dogecoin', code: 'DOGE', icon: 'tokens/DOGE.svg', price: 0.07 },
    { name: 'Solana', code: 'SOL', icon: 'tokens/SOL.svg', price: 149.23 },
    { name: 'Ripple', code: 'XRP', icon: 'tokens/XRP.svg', price: 0.52 },
    { name: 'Polkadot', code: 'DOT', icon: 'tokens/DOT.svg', price: 6.34 },
    { name: 'Litecoin', code: 'LTC', icon: 'tokens/LTC.svg', price: 75.81 },
    { name: 'Chainlink', code: 'LINK', icon: 'tokens/LINK.svg', price: 14.92 },
    { name: 'Worldcoin', code: 'WLD', icon: 'tokens/WLD.svg', price: 1.23 },
    { name: 'Binance Coin', code: 'BNB', icon: 'tokens/BNB.svg', price: 305.67 },
    { name: 'Monero', code: 'XMR', icon: 'tokens/XMR.svg', price: 234.56 },
    { name: 'Polygon', code: 'MATIC', icon: 'tokens/MATIC.svg', price: 1.42 },
    { name: 'Shiba Inu', code: 'SHIB', icon: 'tokens/SHIB.svg', price: 0.000019 },
    { name: 'Uniswap', code: 'UNI', icon: 'tokens/UNI.svg', price: 24.75 },
    { name: 'Tezos', code: 'XTZ', icon: 'tokens/XTZ.svg', price: 4.12 },
    { name: 'Cosmos', code: 'ATOM', icon: 'tokens/ATOM.svg', price: 24.13 },
    { name: 'VeChain', code: 'VET', icon: 'tokens/VET.svg', price: 0.14 },
    { name: 'Stellar', code: 'XLM', icon: 'tokens/XLM.svg', price: 0.25 },
    { name: 'Avalanche', code: 'AVAX', icon: 'tokens/AVAX.svg', price: 37.89 },
    { name: 'Tron', code: 'TRX', icon: 'tokens/TRX.svg', price: 0.11 },
    { name: 'Filecoin', code: 'FIL', icon: 'tokens/FIL.svg', price: 6.23 },
    { name: 'Hedera', code: 'HBAR', icon: 'tokens/HBAR.svg', price: 0.08 },
    { name: 'Internet Computer', code: 'ICP', icon: 'tokens/ICP.svg', price: 12.31 },
    { name: 'EOS', code: 'EOS', icon: 'tokens/EOS.svg', price: 0.99 },
    { name: 'Near Protocol', code: 'NEAR', icon: 'tokens/NEAR.svg', price: 3.67 },
    { name: 'Aptos', code: 'APT', icon: 'tokens/APT.svg', price: 7.24 },
    { name: 'The Graph', code: 'GRT', icon: 'tokens/GRT.svg', price: 0.22 },
    { name: 'Maker', code: 'MKR', icon: 'tokens/MKR.svg', price: 2756.43 },
    { name: 'Fantom', code: 'FTM', icon: 'tokens/FTM.svg', price: 0.44 },
    { name: 'Arbitrum', code: 'ARB', icon: 'tokens/ARB.svg', price: 1.13 },
    // 20 Fiat Currencies
    { name: 'Australian Dollar', code: 'AUD', icon: 'tokens/AUD.svg', price: 1.48 },
    { name: 'Brazilian Real', code: 'BRL', icon: 'tokens/BRL.svg', price: 4.98 },
    { name: 'British Pound', code: 'GBP', icon: 'tokens/GBP.svg', price: 1.23 },
    { name: 'Canadian Dollar', code: 'CAD', icon: 'tokens/CAD.svg', price: 1.35 },
    { name: 'Chinese Yuan', code: 'CNY', icon: 'tokens/CNY.svg', price: 7.3 },
    { name: 'Euro', code: 'EUR', icon: 'tokens/EUR.svg', price: 0.96 },
    { name: 'Indian Rupee', code: 'INR', icon: 'tokens/INR.svg', price: 83.15 },
    { name: 'Indonesian Rupiah', code: 'IDR', icon: 'tokens/IDR.svg', price: 15743 },
    { name: 'Japanese Yen', code: 'JPY', icon: 'tokens/JPY.svg', price: 151.57 },
    { name: 'Mexican Peso', code: 'MXN', icon: 'tokens/MXN.svg', price: 17.09 },
    { name: 'New Zealand Dollar', code: 'NZD', icon: 'tokens/NZD.svg', price: 1.62 },
    { name: 'Russian Ruble', code: 'RUB', icon: 'tokens/RUB.svg', price: 92.57 },
    { name: 'Saudi Riyal', code: 'SAR', icon: 'tokens/SAR.svg', price: 3.75 },
    { name: 'Singapore Dollar', code: 'SGD', icon: 'tokens/SGD.svg', price: 1.35 },
    { name: 'South African Rand', code: 'ZAR', icon: 'tokens/ZAR.svg', price: 18.79 },
    { name: 'South Korean Won', code: 'KRW', icon: 'tokens/KRW.svg', price: 1450 },
    { name: 'Swiss Franc', code: 'CHF', icon: 'tokens/CHF.svg', price: 0.89 },
    { name: 'Vietnam Dong', code: 'VND', icon: 'tokens/VND.svg', price: 25000 },
    // Commodity
    { name: 'Silver', code: 'SILVER', icon: 'tokens/SILVER.svg', price: 35 },
    { name: 'Gold', code: 'GOLD', icon: 'tokens/GOLD.svg', price: 2900 }
];

function addOrderId(array) {
    let i = 0;
    for (let object of array) {
      object.id = i;
      i += 1;
    }
}

addOrderId(currencyData)

async function fetchCryptoPrices() {
    try {
        const response = await fetch(API_URL_CRYPTO);
        const data = await response.json();

        currencyData.forEach(currency => {
            const lowerCaseCode = currency.code.toLowerCase();
            if (data[lowerCaseCode] && data[lowerCaseCode].usd) {
                currency.price = data[lowerCaseCode].usd;
            }
        });
        console.log("Crypto prices updated.");
    } catch (error) {
        console.error("Error fetching crypto prices:", error);
    }
}

async function fetchForexRates() {
    try {
        const response = await fetch(API_URL_FOREX);
        const data = await response.json();

        if (data.rates) {
            currencyData.forEach(currency => {
                if (data.rates[currency.code]) {
                    currency.price = 1 / data.rates[currency.code];
                }
            });
        }
        console.log("Forex prices updated.");
    } catch (error) {
        console.error("Error fetching forex prices:", error);
    }
}

async function fetchMetalPrices() {
    try {
        const response = await fetch(API_URL_METALS);
        const data = await response.json();

        if (data.rates) {
            currencyData.forEach(currency => {
                if (currency.code === 'GOLD' && data.rates['USDXAU']) {
                    currency.price = data.rates['USDXAU'];
                }
                if (currency.code === 'SILVER' && data.rates['USDXAG']) {
                    currency.price = data.rates['USDXAG'];
                }
            });
        }
        console.log("Metal prices updated.");
    } catch (error) {
        console.error("Error fetching metal prices:", error);
    }
}

async function updatePrices() {
    await fetchCryptoPrices();
    await fetchForexRates();
    await fetchMetalPrices();
}

// Fetch data every 100 seconds
setInterval(updatePrices, 99999);

// Initial Fetch
updatePrices();