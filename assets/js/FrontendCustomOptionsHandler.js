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
                <bdi id="lakeringTotal" class="lakeringPrice">0,00&nbsp;<span class="woocommerce-Price-currencySymbol">kr.</span></bdi>
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
                <bdi id="cornerTotal" class="cornerPrice">00,00&nbsp;<span class="woocommerce-Price-currencySymbol">kr.</span></bdi>
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
                <bdi id="holeTotal" class="holePrice">0,00&nbsp;<span class="woocommerce-Price-currencySymbol">kr.</span></bdi>
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
    const holeMailNotif = document.getElementById('mailNotifyHoles');
    const holePrice = document.getElementById('holePrice');

    holesRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'Yes') {
                holePrice.style.display = "block";
                holesOptions.style.display = 'block';
                holeMailNotif.style.display = "block";
                holesRow.style.display = 'table-row';
                holesQuantity.setAttribute('required', 'required');
                holesQuantity.addEventListener('input', updateHolePrice);
                holesQuantity.addEventListener('input', safeUpdateTotalPrice);
            } else {
                holesQuantity.removeEventListener('input', safeUpdateTotalPrice);
                holesQuantity.removeEventListener('input', updateHolePrice);
                holesQuantity.removeAttribute('required');
                holesQuantity.value = '';
                holesRow.style.display = 'none';
                holeMailNotif.style.display = "none";
                holesOptions.style.display = 'none';
                holesPriceDisplay.forEach(el => {
                    el.innerHTML = `0 kr.`;
                });
                holePrice.style.display = "none";
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
            el.innerHTML = `${calculatedHolePrice} kr.`;
        });
        return calculatedHolePrice;
    }

    const cornerQuantity = document.getElementById('corners_quantity');
    const cornerPriceDisplay = document.querySelectorAll('.cornerPrice');
    const cornerRadios = document.getElementsByName('corners_choice');
    const cornerOptions = document.getElementById('corners-options');
    const cornersRow = document.getElementById('cornersRow');
    const cornerMailNotif = document.getElementById('mailNotifyCorner');
    const cornerPrice = document.getElementById('cornerPrice');

    cornerRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'Yes') {
                cornerPrice.style.display = "block";
                cornerOptions.style.display = 'block';
                cornerMailNotif.style.display = "block";
                cornersRow.style.display = 'table-row';
                cornerQuantity.setAttribute('required', 'required');
                cornerQuantity.value = "4";
                cornerQuantity.addEventListener('input', updateCornerPrice);
                cornerQuantity.addEventListener('input', safeUpdateTotalPrice);
                safeUpdateTotalPrice();
            } else {
                cornerQuantity.removeEventListener('input', safeUpdateTotalPrice);
                cornerQuantity.removeEventListener('input', updateCornerPrice);
                cornerQuantity.removeAttribute('required');
                cornerQuantity.value = '';
                cornersRow.style.display = 'none';
                cornerMailNotif.style.display = "none";
                cornerOptions.style.display = 'none';
                cornerPriceDisplay.forEach(el => {
                    el.innerHTML = `0 kr.`;
                });
                cornerPrice.style.display = "none";
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
            el.innerHTML = `${calculatedCornerPrice} kr.`;
        });
        return calculatedCornerPrice;
    }

    const lengthInput = document.querySelector('input[name="length"]');
    const widthInput = document.querySelector('input[name="width"]');
    const quantityInput = document.querySelector('input[name="quantity"]');
    const lakeringPriceDisplay = document.querySelectorAll(".lakeringPrice");
    const lakeringRow = document.getElementById('lakeringRow');
    const lakeringPriceDropDown = document.getElementById('lakeringPriceDropDown');
    const lakeringMailNotif = document.getElementById('mailNotifyLakering');

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
            el.innerHTML = `${lakeringResult} kr.`;;
        });
        return lakeringResult;
    }

    // Lakering functionality
    const lakeringRadios = document.getElementsByName('lakering_choice');
    lakeringRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'Yes') {
                if (lakeringPriceDropDown) lakeringPriceDropDown.style.display = 'block';
                lakeringMailNotif.style.display = "block";
                if (lakeringRow) lakeringRow.style.display = 'table-row';
                safeUpdateTotalPrice();
            } else {
                if (lakeringRow) lakeringRow.style.display = 'none';
                lakeringMailNotif.style.display = "none";
                if (lakeringPriceDropDown) lakeringPriceDropDown.style.display = 'none';
                if (lakeringPriceDisplay.length > 0) {
                    lakeringPriceDisplay.forEach(el => {
                        el.innerHTML = `0 kr.`;
                    });
                }
            }
        });
    });

    // Add event listeners with proper element checks
    if (lengthInput) lengthInput.addEventListener('input', safeUpdateTotalPrice);
    if (widthInput) widthInput.addEventListener('input', safeUpdateTotalPrice);
    if (quantityInput) quantityInput.addEventListener('input', safeUpdateTotalPrice);
    
    // Fixed updateTotalPrice function with proper element checks
    function parseEUPrice(str) {
        if (!str) return 0;
        let raw = str.replace(/[^\d.,-]/g, '');  // keep digits, comma, dot, minus
        raw = raw.replace(/\./g, '');            // remove thousands dots
        raw = raw.replace(',', '.');             // convert decimal comma to dot
        const num = Number(raw);
        return Number.isFinite(num) ? num : 0;
    }

    function updateTotalPrice() {
        isUpdatingTotal = true; // Flag to prevent monitoring from triggering
    
        // Find the total price element each time the function runs
        const totalPriceBdi = document.querySelector('.total_price td:last-child span bdi');
    
        // Exit early if the element doesn't exist or isn't visible
        if (!totalPriceBdi || !totalPriceBdi.textContent) {
            console.log('Total price element not found or not ready');
            isUpdatingTotal = false;
            return;
        }
    
        // Check if the element is visible (not hidden by other scripts)
        const totalPriceRow = totalPriceBdi.closest('.total_price');
        if (!totalPriceRow || totalPriceRow.style.display === 'none' ||
            getComputedStyle(totalPriceRow).display === 'none') {
            console.log('Total price row is hidden');
            isUpdatingTotal = false;
            return;
        }
    
    
    
        // Start with the stored base price
        let total = basePrice;
    
        // If base price is 0, fallback: read it from the DOM element
        if (total === 0) {
            total = parseEUPrice(totalPriceBdi.textContent);
            basePrice = total; // store it for next time
        }
    
        // Holes
        if (document.getElementById('holeTotal')) {
            holesRadios.forEach(radio => {
                if (radio.value === 'Yes' && radio.checked) {
                    let holeTotal = updateHolePrice();
                    if (typeof holeTotal === 'number' && !isNaN(holeTotal)) {
                        total += holeTotal;
                    }
                }
            });
        }
    
        // Corners
        if (document.getElementById('cornerTotal')) {
            cornerRadios.forEach(radio => {
                if (radio.value === 'Yes' && radio.checked) {
                    let cornerTotal = updateCornerPrice();
                    if (typeof cornerTotal === 'number' && !isNaN(cornerTotal)) {
                        total += cornerTotal;
                    }
                }
            });
        }
    
        // Lakering
        if (document.getElementById('lakeringTotal')) {
            let lakeringTotal = calculateLakeringPrice();
            if (typeof lakeringTotal === 'number' && !isNaN(lakeringTotal)) {
                total += lakeringTotal;
            }
        }
    
        // Only update if we have a valid total
        if (typeof total === 'number' && !isNaN(total)) {
            // Format with EU style: 2 decimals, decimal comma
            totalPriceBdi.innerHTML = total.toFixed(2).replace('.', ',');
            lastKnownTotal = totalPriceBdi.textContent; // Update tracking
        } else {
            console.warn('Invalid total calculated');
        }
    
        isUpdatingTotal = false; // Reset flag
    }
    

    // Track the last known total to detect when external script changes it
    let lastKnownTotal = null;
    let isUpdatingTotal = false;
    let basePrice = 0; // Store the original base price from external script

    // Optional: Retry mechanism for when the total price element isn't immediately available
    function safeUpdateTotalPrice() {
        if (isUpdatingTotal) {
            console.log('updating in progress');
            return; // Prevent recursion
        }
        const totalPriceBdi = document.querySelector('.total_price td:last-child span bdi');
        if (totalPriceBdi && totalPriceBdi.textContent) {
            updateTotalPrice();
        } else {
            // Retry after a short delay if element isn't ready
            setTimeout(() => {
                const retryElement = document.querySelector('.total_price td:last-child span bdi');
                if (retryElement && retryElement.textContent) {
                    updateTotalPrice();
                }
            }, 100);
        }
    }

    // Monitor for external script changes and re-apply our calculations
    function monitorTotalPriceChanges() {
        const totalPriceBdi = document.querySelector('.total_price td:last-child span bdi');
        if (!totalPriceBdi) return;
    
        const currentTotal = totalPriceBdi.textContent;
        
        if (currentTotal !== lastKnownTotal && !isUpdatingTotal) {
            console.log('External script changed total price, capturing new base price');
            
            const newBasePrice = parseEUPrice(currentTotal); // ✅ parse properly
    
            if (newBasePrice !== basePrice) {
                basePrice = newBasePrice;
                console.log('New base price captured:', basePrice);
            }
            
            setTimeout(() => {
                updateTotalPrice();
            }, 50);
        }
        
        lastKnownTotal = currentTotal;
    }

    // Initialize base price on page load
    function initializeBasePrice() {
        const totalPriceBdi = document.querySelector('.total_price td:last-child span bdi');
        if (totalPriceBdi && totalPriceBdi.textContent) {
            basePrice = parseEUPrice(totalPriceBdi.textContent); // ✅ use helper
            lastKnownTotal = totalPriceBdi.textContent;
            console.log('Initial base price set to:', basePrice);
        }
    }

    // Initialize base price
    initializeBasePrice();

    // Start monitoring every 200ms
    setInterval(monitorTotalPriceChanges, 200);
});