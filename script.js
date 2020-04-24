const priceInput = document.querySelector('#priceInput');
const priceDisplay = document.querySelector('#priceDisplay');
const sellType = document.querySelector('#sellType');
const horseTierSelect = document.querySelector('#horseTierSelect');
const priceInputAMC = document.querySelector('#priceInputAMC');
const priceInputBMC = document.querySelector('#priceInputBMC');
const trainingLevel = document.querySelector('#trainingLevel');
const options = document.querySelector('.options');
const row2 = document.querySelector('.row-2');
const row3 = document.querySelector('.row-3');
const valuePack = document.querySelector('#valuePack');
const familyFame = document.querySelector('#familyFameSelect');
const inputs = document.querySelectorAll('input');
const select = document.querySelectorAll('select');

sellType.addEventListener('change', changeOptions);

valuePack.addEventListener('click', () => {
    toggleValuePack();
    updateMarketSilverReturn();
    getPrice();
});

familyFame.addEventListener('change', updateMarketSilverReturn);

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
        horseTierSelect.hidden = false;
        trainingLevel.hidden = true;
        row2.hidden = false;
        row3.hidden = false;
        options.style.left = "3.35em";
    } else {
        horseTierSelect.hidden = true;
        trainingLevel.hidden = false;
        row2.hidden = true;
        row3.hidden = true;
        options.style.left = "2.15em";
    }
}

function removeThousandSeparators() {
    let inputsMerged = priceInput.value.concat(priceInputAMC.value, priceInputBMC.value);
    if (inputsMerged.includes(',') || inputsMerged.includes('.') || inputsMerged.includes(' ')) {
        sellPrice = priceInput.value.replace(/,|\.| /g, '');
        priceAMC = priceInputAMC.value.replace(/,|\.| /g, '');
        priceBMC = priceInputBMC.value.replace(/,|\.| /g, '');
    } else {
        sellPrice = priceInput.value;
        priceAMC = priceInputAMC.value;
        priceBMC = priceInputBMC.value;
    }
}

function toggleValuePack() {
    if (valuePack.textContent === "Value Pack ON") {
        valuePack.textContent = "Value Pack OFF";
    } else {
        valuePack.textContent = "Value Pack ON";
    }
}

function updateMarketSilverReturn() {
    if (valuePack.textContent === "Value Pack ON") {
        valuePack.value = 0.65 * (1.3 + Number(familyFame.value));
    } else {
        valuePack.value = 0.65 * (1 + Number(familyFame.value));
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
    let taxedPrice = sellPrice * .7;
    let marketPrice = taxedPrice * trainingLevel.value + taxedPrice;
    let finalPrice = Math.round(marketPrice);
    return addCommas(finalPrice);
}

function getImperialPrice() {
    let imperialPrice = (priceBMC * valuePack.value - priceAMC) / 12 * horseTierSelect.value + (sellPrice / 2);
    let finalPrice = Math.round(imperialPrice);
    return addCommas(finalPrice);
}
