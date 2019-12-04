const priceInput = document.querySelector('#priceInput');
const priceDisplay = document.querySelector('#priceDisplay');
const sellType = document.querySelector('#sellType');
const horseTier = document.querySelector('#horseTier');
const horseTierSelect = document.querySelector('#horseTierSelect');
const priceInputAMC = document.querySelector('#priceInputAMC');
const priceInputBMC = document.querySelector('#priceInputBMC');
const trainingLevel = document.querySelector('#trainingLevel');
const calculate = document.querySelector('#calculate');
const inputs = document.querySelectorAll('input');
const select = document.querySelectorAll('select');

sellType.addEventListener('change', changeOptions);

select.forEach((select) => {
    select.addEventListener('change', getPrice);
});

inputs.forEach((input) => {
    input.addEventListener('keyup', () => {
        removeThousandSeparators();
        getPrice();
    });
});

function changeOptions() {
    if (sellType.value === 'imperial') {
        horseTierSelect.disabled = false;
        priceInputAMC.disabled = false;
        priceInputBMC.disabled = false;
        trainingLevel.disabled = true;     
    } else {
        horseTierSelect.disabled = true;
        priceInputAMC.disabled = true;
        priceInputBMC.disabled = true;
        trainingLevel.disabled = false;
    }
}

function removeThousandSeparators() {
    let inputsMerged = priceInput.value.concat(priceInputAMC.value, priceInputBMC.value);
    if (inputsMerged.includes(',') || inputsMerged.includes('.') || inputsMerged.includes(' ')) {
        sellPrice = priceInput.value.replace(/,|\.| /g,'');
        priceAMC = priceInputAMC.value.replace(/,|\.| /g,'');
        priceBMC = priceInputBMC.value.replace(/,|\.| /g,'');
    } else {
        sellPrice = priceInput.value;
        priceAMC = priceInputAMC.value;
        priceBMC = priceInputBMC.value;
    }
}

function addCommas(num) {
    return (num + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

function getPrice() {
    if (sellType.value === 'imperial') {
        priceDisplay.textContent = getImperialPrice();
    } else {
        priceDisplay.textContent = getMarketPrice();
    }
}

function getMarketPrice() {
    let taxedPrice = (sellPrice - sellPrice * .3);
    let marketPrice = (taxedPrice) * trainingLevel.value + (taxedPrice);
    let finalPrice = Math.round(marketPrice);
    return addCommas(finalPrice);
}

function getImperialPrice() {
    let imperialPrice = (priceBMC - priceAMC) / 12 * horseTierSelect.value + (sellPrice / 2);
    let finalPrice = Math.round(imperialPrice);
    return addCommas(finalPrice);
}
