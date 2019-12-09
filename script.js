const priceInput = document.querySelector('#priceInput');
const priceDisplay = document.querySelector('#priceDisplay');
const sellType = document.querySelector('#sellType');
const horseTier = document.querySelector('#horseTier');
const horseTierSelect = document.querySelector('#horseTierSelect');
const priceInputAMC = document.querySelector('#priceInputAMC');
const priceInputBMC = document.querySelector('#priceInputBMC');
const trainingLevel = document.querySelector('#trainingLevel');
const valuePack = document.querySelector('#vpCheck');
const familyFame = document.querySelector('#familyFameSelect');
const inputs = document.querySelectorAll('input');
const select = document.querySelectorAll('select');

sellType.addEventListener('change', changeOptions);

valuePack.addEventListener('change', () => {
    updateValuePackMod();
    getPrice();
});

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
        valuePack.disabled = false;
        familyFame.disabled = false;   
    } else {
        horseTierSelect.disabled = true;
        priceInputAMC.disabled = true;
        priceInputBMC.disabled = true;
        trainingLevel.disabled = false;
        valuePack.disabled = true;
        familyFame.disabled = true; 
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

function updateValuePackMod() {
    if (valuePack.checked) {
        valuePack.value = "0.845";
    } else {
        valuePack.value = "0.65";
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
    let taxedPrice = (sellPrice * .7);
    let marketPrice = (taxedPrice) * trainingLevel.value + (taxedPrice);
    let finalPrice = Math.round(marketPrice);
    return addCommas(finalPrice);
}

function getImperialPrice() {
    let imperialPrice = (priceBMC * (Number(valuePack.value) + Number(familyFame.value)) - priceAMC) / 12 * horseTierSelect.value + (sellPrice / 2);
    let finalPrice = Math.round(imperialPrice);
    return addCommas(finalPrice);
}
