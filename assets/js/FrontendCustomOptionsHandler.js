document.addEventListener('DOMContentLoaded', function() {
    const holesRadios = document.getElementsByName('holes_choice');
    const holesOptions = document.getElementById('holes-options');
    const holesQuantity = document.getElementById('holes_quantity');
    const holesPriceDisplay = document.getElementById('holePrice');

    holesRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'Yes') {
                holesOptions.style.display = 'block';
                holesQuantity.setAttribute('required', 'required');
                holesQuantity.addEventListener('input', updateHolePrice);
            } else {
                holesQuantity.removeEventListener('input', updateHolePrice);
                holesQuantity.removeAttribute('required');
                holesQuantity.value = '';
                holesOptions.style.display = 'none';
                holesPriceDisplay.innerHTML = `150kr for det første, derefter 50kr stykket`;

            }
        });
    });
    function updateHolePrice() {
        let n = parseInt(holesQuantity.value, 10);

        // Ensure n is a valid number and >= 1
        if (isNaN(n) || n < 1) {
            n = 1;
        }

        const calculatedHolePrice = (n - 1) * 50 + 150;
        holesPriceDisplay.innerHTML = `+${calculatedHolePrice}kr,- `;
    }
    const cornerQuantity = document.getElementById('corners_quantity');
    const cornerPriceDisplay = document.getElementById('cornerPrice');
    const cornerRadios = document.getElementsByName('corners_choice');
    const cornerOptions = document.getElementById('corners-options');

    cornerRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'Yes') {
                cornerOptions.style.display = 'block';
                cornerQuantity.setAttribute('required', 'required');
                cornerQuantity.addEventListener('input', updateCornerPrice);
            } else {
                cornerQuantity.removeEventListener('input', updateHolePrice);
                cornerQuantity.removeAttribute('required');
                cornerQuantity.value = '';
                cornerOptions.style.display = 'none';
                cornerPriceDisplay.innerHTML = `50kr stykket`;
            }
        });
    });
    function updateCornerPrice() {
        let n = parseInt(cornerQuantity.value, 10);

        // Ensure n is a valid number and >= 1
        if (isNaN(n) || n < 1) {
        n = 1;
        }

        const calculatedCornerPrice = n * 50;
        cornerPriceDisplay.innerHTML = `+${calculatedCornerPrice}kr,- `;
    }

    const lengthInput = document.querySelector('input[name="length"]');
    const widthInput = document.querySelector('input[name="width"]');
    const quantityInput = document.querySelector('input[name="quantity"]');
    const lakeringPriceDisplay = document.getElementById("lakeringPrice");

    function calculateLakeringPrice() {
        const length = parseFloat(lengthInput?.value);
        const width = parseFloat(widthInput?.value);
        const quantity = parseInt(quantityInput?.value, 10);
        const lakeringSelected = document.querySelector('input[name="lakering_choice"]:checked')?.value === 'Yes';

        if (isNaN(length) || isNaN(width) || isNaN(quantity) || !lakeringSelected) {
            if (lakeringPriceDisplay) {
                lakeringPriceDisplay.innerHTML = '0';
            }
            return;
        }

        let lakeringResult = (length * width) / 1000000 * 2 * quantity * 250;

        if (lakeringResult < 500) {
            lakeringResult += 350;
        }
        lakeringResult *= 1.25;
        lakeringResult = Math.ceil(lakeringResult);
        if (lakeringPriceDisplay) {
            lakeringPriceDisplay.innerHTML = `+${lakeringResult}kr,- `;
        }
    }

    if (lengthInput) lengthInput.addEventListener('input', calculateLakeringPrice);
    if (widthInput) widthInput.addEventListener('input', calculateLakeringPrice);
    if (quantityInput) quantityInput.addEventListener('input', calculateLakeringPrice);
    
    // Lakering functionality
    const lakeringRadios = document.getElementsByName('lakering_choice');
    lakeringRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'Yes') {
                lakeringPriceDisplay.style.display = 'block';
                calculateLakeringPrice();
            } else {
                lakeringPriceDisplay.style.display = 'none';
                if (lakeringPriceDisplay) {
                    lakeringPriceDisplay.innerHTML = '0';
                }
            }
        });
    });
});