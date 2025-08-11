document.addEventListener('DOMContentLoaded', function() {

    const tableBody = document.querySelector('table.aveo_calculator tbody');
    const totalPriceRow = tableBody.querySelector('.total_price');
    
    if (totalPriceRow) {
        // Create Lakering row
        const lakeringRow = document.createElement('tr');
        lakeringRow.id = 'lakeringRow';
        lakeringRow.style.display = 'none';
        lakeringRow.className = 'lakering_price';
        lakeringRow.innerHTML = `
            <td>Lakering</td>
            <td><span class="woocommerce-Price-amount amount">
                <bdi id="lakeringTotal" class="lakeringPrice">439,00&nbsp;<span class="woocommerce-Price-currencySymbol">kr.</span></bdi>
            </span></td>
        `;
    
        // Create Hjørner row
        const cornersRow = document.createElement('tr');
        cornersRow.id = 'cornersRow';
        cornersRow.style.display = 'none';
        cornersRow.className = 'corners_price';
        cornersRow.innerHTML = `
            <td>Hjørner</td>
            <td><span class="woocommerce-Price-amount amount">
                <bdi id="cornerTotal" class="cornerPrice">50,00&nbsp;<span class="woocommerce-Price-currencySymbol">kr.</span></bdi>
            </span></td>
        `;
    
        // Create Huller row
        const holesRow = document.createElement('tr');
        holesRow.id = 'holesRow';
        holesRow.style.display = 'none';
        holesRow.className = 'holes_price';
        holesRow.innerHTML = `
            <td>Huller</td>
            <td><span class="woocommerce-Price-amount amount">
                <bdi id="holeTotal" class="holePrice">150,00&nbsp;<span class="woocommerce-Price-currencySymbol">kr.</span></bdi>
            </span></td>
        `;


    
        // Insert rows in correct order (before total price row)
        tableBody.insertBefore(holesRow, totalPriceRow);
        tableBody.insertBefore(cornersRow, totalPriceRow);
        tableBody.insertBefore(lakeringRow, totalPriceRow);
    } else {
        console.error("Total price row not found");
    }


    const holesRadios = document.getElementsByName('holes_choice');
    const holesOptions = document.getElementById('holes-options');
    const holesQuantity = document.getElementById('holes_quantity');
    const holesRow = document.getElementById('holesRow');
    const holesPriceDisplay = document.querySelectorAll('.holePrice');

    holesRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'Yes') {
                holesOptions.style.display = 'block';
                holesRow.style.display = 'table-row';
                holesQuantity.setAttribute('required', 'required');
                holesQuantity.addEventListener('input', updateTotalPrice);
            } else {
                holesQuantity.removeEventListener('input', updateTotalPrice);
                holesQuantity.removeAttribute('required');
                holesQuantity.value = '';
                holesRow.style.display = 'none';
                holesOptions.style.display = 'none';
                holesPriceDisplay.forEach(el => {
                    el.innerHTML = `150kr for det første, derefter 50kr stykket`;
                });

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
        holesPriceDisplay.forEach(el => {
            el.innerHTML = `+${calculatedHolePrice}kr,-`;
        });
        return calculatedHolePrice;
    }
    const cornerQuantity = document.getElementById('corners_quantity');
    const cornerPriceDisplay = document.querySelectorAll('.cornerPrice');
    const cornerRadios = document.getElementsByName('corners_choice');
    const cornerOptions = document.getElementById('corners-options');
    const cornersRow = document.getElementById('cornersRow');

    cornerRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'Yes') {
                cornerOptions.style.display = 'block';
                cornersRow.style.display = 'table-row';
                cornerQuantity.setAttribute('required', 'required');
                cornerQuantity.addEventListener('input', updateTotalPrice);
            } else {
                cornerQuantity.removeEventListener('input', updateTotalPrice);
                cornerQuantity.removeAttribute('required');
                cornerQuantity.value = '';
                cornersRow.style.display = 'none';
                cornerOptions.style.display = 'none';
                cornerPriceDisplay.forEach(el => {
                    el.innerHTML = `50kr,- stykket`;
                });
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
        cornerPriceDisplay.forEach(el => {
            el.innerHTML = `+${calculatedCornerPrice}kr,-`;
        });
        return calculatedCornerPrice;
    }

    const lengthInput = document.querySelector('input[name="length"]');
    const widthInput = document.querySelector('input[name="width"]');
    const quantityInput = document.querySelector('input[name="quantity"]');
    const lakeringPriceDisplay = document.querySelectorAll(".lakeringPrice");
    const lakeringRow = document.getElementById('lakeringRow');
    const lakeringPriceDropDown = document.getElementById('lakeringPriceDropDown');

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
        lakeringPriceDisplay.forEach(el => {
            el.innerHTML = `+${lakeringResult}kr,- `;;
        });
        return lakeringResult;
    }

    if (lengthInput) lengthInput.addEventListener('input', updateTotalPrice);
    if (widthInput) widthInput.addEventListener('input', updateTotalPrice);
    if (quantityInput) quantityInput.addEventListener('input', updateTotalPrice);
    
    // Lakering functionality
    const lakeringRadios = document.getElementsByName('lakering_choice');
    lakeringRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'Yes') {
                lakeringPriceDropDown.style.display = 'block';
                lakeringRow.style.display = 'table-row';
                updateTotalPrice();
            } else {
                lakeringRow.style.display = 'none';
                lakeringPriceDropDown.style.display = 'none';
                if (lakeringPriceDropDown) {
                    holesPriceDisplay.forEach(el => {
                        el.innerHTML = `0kr,-`;
                    });
                }
            }
        });
    });
    const totalPriceBdi = document.querySelector('.total_price td:last-child span bdi');
    lengthInput.addEventListener('input', updateTotalPrice);
    widthInput.addEventListener('input', updateTotalPrice);
    quantityInput.addEventListener('input', updateTotalPrice);
    function updateTotalPrice() {
        const totalPriceBdi = document.querySelector('.total_price td:last-child span bdi');
        
        let total = parseFloat(totalPriceBdi.textContent.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;

        if (document.getElementById('holeTotal')) {
            holesRadios.forEach(radio => {
                if (radio.value === 'Yes' && radio.checked) {
                    let holeTotal = updateHolePrice(); // updateHolePrice must return a number
                    total += holeTotal;

                }
            });
        }
        
        if (document.getElementById('holeTotal')) {
            cornerRadios.forEach(radio => {
                if (radio.value === 'Yes' && radio.checked) {
                    let cornerTotal = updateCornerPrice(); // updateHolePrice must return a number
                    total += cornerTotal;
                    console.log('true');
                }
            });
        }
        
        if (document.getElementById('lakeringTotal')) {
            lakeringTotal = calculateLakeringPrice();
            if (typeof lakeringTotal !== 'undefined' && lakeringTotal !== null) {
                calculateLakeringPrice();
                total += lakeringTotal;
                
            }
        }
        totalPriceBdi.innerHTML = total;
        
    };  
});


