function setSelectedCurrencies(currency1 = 1, currency2 = 0) {
    return {
        currency1: currencyData[currency1],
        currency2: currencyData[currency2]
    }
}

let selectedCurrencies = setSelectedCurrencies()

const dropdown1 = document.getElementById('dropdown-currency-1')
const dropdownBtn1 = document.getElementById('currency-btn-1')
const dropdownCurrency1 = document.getElementById('dropdown-currency-1')
const dropdown2 = document.getElementById('dropdown-currency-2')
const dropdownBtn2 = document.getElementById('currency-btn-2')
const dropdownCurrency2 = document.getElementById('dropdown-currency-2')

const convertBtn = document.getElementById('convert-btn')

function handleCurrencyDropdown(dropdownCurrency, dropdown) {
    dropdownCurrency.innerHTML = currencyData.map((currency, index) => {
        return `<li id="${index}"> 
            <img src="${currency.icon}" class="currency-icon"> ${currency.code}
        </li>`;
    }).join('');

    dropdownCurrency.addEventListener('click', e => {
        e.stopPropagation();
        const target = e.target.closest('li');
        const selectedIndex = target.id;

        if (dropdownCurrency.id === 'dropdown-currency-1') {
            selectedCurrencies = setSelectedCurrencies(Number(selectedIndex), selectedCurrencies.currency2.id);
        } else {
            selectedCurrencies = setSelectedCurrencies(selectedCurrencies.currency1.id, Number(selectedIndex));
        }

        dropdown.style.display = 'none';
        displayCurrency(selectedCurrencies);
        updateRateDisplay(selectedCurrencies);
        recalculateExchange(selectedCurrencies);

        // Reassign synchronization with updated currencies
        synchronizeInputs(input1, input2, selectedCurrencies.currency1, selectedCurrencies.currency2);
        synchronizeInputs(input2, input1, selectedCurrencies.currency2, selectedCurrencies.currency1);
    });
}

handleCurrencyDropdown(dropdownCurrency1, dropdown1)
handleCurrencyDropdown(dropdownCurrency2, dropdown2)

function dropdownBtnClick(dropdownBtn, dropdown, otherDropdown = null) {
    dropdownBtn.addEventListener('click', e => {
        e.stopPropagation();
        if (otherDropdown) {
            otherDropdown.style.display = 'none';
        }
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    })
}

dropdownBtnClick(dropdownBtn1, dropdown1, dropdown2);
dropdownBtnClick(dropdownBtn2, dropdown2, dropdown1);

// Reverse currency
const input1 = document.getElementById('input-1');
const input2 = document.getElementById('input-2');
const rateDisplay = document.getElementById('rate-display');
const currencyDisplay1 = document.getElementById('currency-1');
const currencyDisplay2 = document.getElementById('currency-2');

function recalculateExchange(selectedCurrencies) {
    const { currency1, currency2 } = selectedCurrencies;
    console.log(currency1, currency2)

    if (input1.value !== '') {
        input2.value = (parseFloat(input1.value) * currency1.price / currency2.price);
    } else {
        input2.value = '';
    }

    if (input2.value === '') {
        input1.value = '';
    }
}

// Function to update rate display
function updateRateDisplay(selectedCurrencies) {
    const { currency1, currency2 } = selectedCurrencies;
    
    rateDisplay.innerHTML = `
        1 
        ${currency1.name} = ${(currency1.price / currency2.price).toLocaleString('en-US', { maximumFractionDigits: 6 })}
        ${currency2.name}
    `;
    
    input1.focus();
    
    // Set aria-placeholder for both input fields
    input1.setAttribute('placeholder', '1');
    input2.setAttribute('placeholder', (currency1.price / currency2.price).toLocaleString('en-US', { maximumFractionDigits: 6 }));
}

// Function to display selected currencies
function displayCurrency(selectedCurrencies) {
    const { currency1, currency2 } = selectedCurrencies;
    currencyDisplay1.innerHTML = `<img src="${currency1.icon}" class="currency-icon"> ${currency1.code}`;
    currencyDisplay2.innerHTML = `<img src="${currency2.icon}" class="currency-icon"> ${currency2.code}`;
}

// Swap currency event
document.getElementById('reverse-btn').addEventListener('click', () => {
    // Swap currency1 and currency2
    [selectedCurrencies.currency1, selectedCurrencies.currency2] = 
        [selectedCurrencies.currency2, selectedCurrencies.currency1];

    // Update UI
    updateRateDisplay(selectedCurrencies);
    displayCurrency(selectedCurrencies);
    recalculateExchange(selectedCurrencies);
    input1.focus();
});


// Initialize
displayCurrency(selectedCurrencies);
updateRateDisplay(selectedCurrencies);

// Ensure inputs are always non-negative while typing
function alwaysPositive(input) {
    input.addEventListener('input', () => {
        if (input.value < 0) {
            input.value = 0;
        }
    });
}

alwaysPositive(input1);
alwaysPositive(input2);

function synchronizeInputs(typingInput, targetInput, typingCurrency, targetCurrency) {
    typingInput.addEventListener('input', () => {
        let value = parseFloat(typingInput.value);

        if (document.activeElement !== typingInput) {
            return; // Only update when user is actively typing
        }

        if (typingInput.value === '' || value < 0) {
            targetInput.value = '';
            return;
        }

        if (!isNaN(value)) {
            const rate = typingCurrency.price / targetCurrency.price;
            targetInput.value = (value * rate).toFixed(2);
        }

        if (value === 0) {
            targetInput.value = 0;
        }
    });
}

// Apply synchronization to both inputs
synchronizeInputs(input1, input2, selectedCurrencies.currency1, selectedCurrencies.currency2);
synchronizeInputs(input2, input1, selectedCurrencies.currency2, selectedCurrencies.currency1);

// key input
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'Tab':
            e.preventDefault();
            if (document.activeElement === input1) {
                input2.focus();
            } else {
                input1.focus();
            }
            break;
        case ' ':
            e.preventDefault();
            document.getElementById('reverse-btn').click();
            break;
    }
});

document.addEventListener('click', e => {
    dropdown1.style.display = 'none'
    dropdown2.style.display = 'none'
})