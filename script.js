            const priceInput = document.querySelector('#priceInput');
            const priceDisplay = document.querySelector('#priceDisplay');
            const sellType = document.querySelector('#sellType');
            const horseTier = document.querySelector('#horseTier');
            const horseTierSelect = document.querySelector('#horseTierSelect');
            const priceAMC = document.querySelector('#priceAMC');
            const priceBMC = document.querySelector('#priceBMC');
            const priceInputAMC = document.querySelector('#priceInputAMC');
            const priceInputBMC = document.querySelector('#priceInputBMC');
            const trainingLevel = document.querySelector('#trainingLevel');
            const calculate = document.querySelector('#calculate');
            const inputs = document.querySelectorAll('input');

            trainingLevel.addEventListener('change', () => {
                priceDisplay.textContent = getMarketPrice();
            });

            horseTierSelect.addEventListener('change', () => {
                priceDisplay.textContent = getImperialPrice();
            });

            sellType.addEventListener('change', changeOptions);

            inputs.forEach((input) => {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        if (sellType.value === 'imperial') {
                            priceDisplay.textContent = getImperialPrice();
                        } else {
                            priceDisplay.textContent = getMarketPrice();
                        }
                        console.log(e.key);
                    }
                });
            });

            calculate.addEventListener('click', () => {
                if (sellType.value === 'imperial') {
                    priceDisplay.textContent = getImperialPrice();
                } else {
                    priceDisplay.textContent = getMarketPrice();
                }
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

            function getMarketPrice() {
                taxedPrice = (priceInput.value - priceInput.value * .3);
                marketPrice = (taxedPrice) * trainingLevel.value + (taxedPrice);
                finalPrice = Math.round(marketPrice);
                return addCommas(finalPrice);
            }

            function getImperialPrice() {
                imperialPrice = (priceInputBMC.value - priceInputAMC.value) / 12 * horseTierSelect.value + (priceInput.value / 2);
                finalPrice = Math.round(imperialPrice);
                return addCommas(finalPrice);
            }

            function addCommas(intNum) {
                return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
            }
