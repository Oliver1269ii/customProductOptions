
// Holes handler

const holesQuantity = document.getElementById('holes_quantity');
var holesEnabled = false;

function updateHoles(event) {
    const intervalId = setInterval(() => {
        const loader = document.getElementById('loader');
        if (!loader) {
            clearInterval(intervalId); // stop checking
                console.log("Loader gone");
                actualHoleUpdate(event);     // run your code
        }
    }, 100);
}
function actualHoleUpdate(event) {

    const holePrice = document.getElementById('holePrice');
    const holesRow = document.getElementById('holesRow');
    const holesOptions = document.getElementById('holes-options');
    const holeMailNotif = document.getElementById('mailNotifyHoles');
    const holesPriceDisplay = document.querySelectorAll('.holePrice');
    if (event.target.value === 'Yes') {
        holePrice.style.display = "block";
        holesOptions.style.display = 'block';
        holeMailNotif.style.display = "block";
        holesRow.style.display = 'table-row';
        holesQuantity.setAttribute('required', 'required');
        holesQuantity.addEventListener('input', updateTotalPrice);
        holesQuantity.addEventListener('input', updateTotalPrice);
        holesEnabled = true;
    } else {
        holesEnabled = false;
        holesQuantity.removeEventListener('input', updateTotalPrice);
        holesQuantity.removeEventListener('input', updateTotalPrice);
        holesQuantity.removeAttribute('required');
        holesQuantity.value = '';
        holesRow.style.display = 'none';
        holeMailNotif.style.display = "none";
        holesOptions.style.display = 'none';
        holesPriceDisplay.forEach(el => {
            el.innerHTML = `0,00 kr.`;
        });
        holePrice.style.display = "none";
    }
    updateTotalPrice();
}

function updateHolePrice() {
    const holesPriceDisplay = document.querySelectorAll('.holePrice');
    const configHolePrice = parseInt(document.getElementById('configFirstHolePrice').textContent);
    const configAdditionalHolePrice = parseInt(document.getElementById('configAdditionalHolePrice').textContent);
    let quantity = holesQuantity.value;
    if (quantity != "") {
        console.log("quantity exists");
        const calculatedHolePrice = (quantity - 1) * configAdditionalHolePrice + configHolePrice;
        holesPriceDisplay.forEach(el => {
            el.innerHTML = `${calculatedHolePrice},00 kr.`;
        });
    
        return calculatedHolePrice;
    } else {
        return 0;
    }

}


// Corner handler

const cornerQuantity = document.getElementById('corners_quantity');
var cornersEnabled = false;

function updateCorners(event) {
    const intervalId = setInterval(() => {
        const loader = document.getElementById('loader');
        if (!loader) {
            clearInterval(intervalId); // stop checking
                console.log("Loader gone");
                actualCornerUpdate(event);     // run your code
        }
    }, 100);
}
function actualCornerUpdate(event) {
    const cornerPriceDisplay = document.querySelectorAll('.cornerPrice');
    const cornerOptions = document.getElementById('corners-options');
    const cornersRow = document.getElementById('cornersRow');
    const cornerMailNotif = document.getElementById('mailNotifyCorner');
    const cornerPrice = document.getElementById('cornerPrice');

    if (event.target.value === 'Yes') {
        cornerPrice.style.display = "block";
        cornerOptions.style.display = 'block';
        cornerMailNotif.style.display = "block";
        cornersRow.style.display = 'table-row';
        cornerQuantity.setAttribute('required', 'required');
        cornerQuantity.value = "4";
        cornerQuantity.addEventListener('input', updateTotalPrice);
        cornerQuantity.addEventListener('input', updateTotalPrice);
        cornersEnabled = true;
    } else {
        cornersEnabled = false;
        cornerQuantity.removeEventListener('input', updateTotalPrice);
        cornerQuantity.removeEventListener('input', updateTotalPrice);
        cornerQuantity.removeAttribute('required');
        cornerQuantity.value = '';
        cornersRow.style.display = 'none';
        cornerMailNotif.style.display = "none";
        cornerOptions.style.display = 'none';
        cornerPriceDisplay.forEach(el => {
            el.innerHTML = `0,00 kr.`;
        });
        cornerPrice.style.display = "none";
    }
    updateTotalPrice();
}

function updateCornerPrice() {
    const cornerPriceDisplay = document.querySelectorAll('.cornerPrice');
    const configCornerPrice = parseInt(document.getElementById('configCornerPrice').textContent);
    let quantity = cornerQuantity.value;
    const calculatedCornerPrice = quantity * configCornerPrice;
    cornerPriceDisplay.forEach(el => {
        el.innerHTML = `${calculatedCornerPrice},00 kr.`;
    });
    return calculatedCornerPrice;
}


// Lakering handler

const lengthInput = document.querySelector('input[name="length"]');
const widthInput = document.querySelector('input[name="width"]');
const quantityInput = document.querySelector('input[name="quantity"]');
const lakeringPriceDisplay = document.querySelectorAll(".lakeringPrice");
var lakeringEnabled = false;

function updateLakering(event) {
    const intervalId = setInterval(() => {
        const loader = document.getElementById('loader');
        if (!loader) {
            clearInterval(intervalId); // stop checking
                console.log("Loader gone");
                actualLakeringUpdate(event);     // run your code
        }
    }, 100);
}
function actualLakeringUpdate(event) {
    const lakeringPriceDropDown = document.getElementById('lakeringPriceDropDown');
    const lakeringMailNotif = document.getElementById('mailNotifyLakering');
    const lakeringRow = document.getElementById('lakeringRow');
    const heightSelect = document.querySelector('select[name="height"]');

    if (event.target.value === 'Yes') {
        lakeringPriceDropDown.style.display = 'block';
        lakeringMailNotif.style.display = "block";
        lakeringRow.style.display = 'table-row';
        lengthInput.addEventListener('input', updateTotalPrice);
        widthInput.addEventListener('input', updateTotalPrice);
        heightSelect.addEventListener('change', updateTotalPrice);
        lakeringEnabled = true;
        updateTotalPrice();
    } else {
        lakeringEnabled = false;
        heightSelect.removeEventListener('change', updateTotalPrice);
        lengthInput.removeEventListener('input', updateTotalPrice);
        widthInput.removeEventListener('input', updateTotalPrice);
        lakeringRow.style.display = 'none';
        lakeringMailNotif.style.display = "none";
        lakeringPriceDropDown.style.display = 'none';
    }
}

function calculateLakeringPrice() {
    const intervalId = setInterval(() => {
        const loader = document.getElementById('loader');
        if (!loader) {
            clearInterval(intervalId); // stop checking
                console.log("Loader gone");
                actualCalculateLakeringPrice();     // run your code
        }
    }, 100);
}

function actualCalculateLakeringPrice() {
    const lakeringPriceDisplay = document.querySelectorAll(".lakeringPrice");
    const length = parseFloat(lengthInput?.value);
    const width = parseFloat(widthInput?.value);
    const quantity = parseInt(quantityInput?.value, 10);
    const lakeringSelected = document.querySelector('input[name="lakering_choice"]:checked')?.value === 'Yes';

    if (isNaN(length) || isNaN(width) || isNaN(quantity) || !lakeringSelected) {
        if (lakeringPriceDisplay) {
            lakeringPriceDisplay.innerHTML = '0,00';
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
        el.innerHTML = `${lakeringResult},00 kr.`;;
    });
    return lakeringResult;
}


// Total price handler

function updateTotalPrice() {
    const intervalId = setInterval(() => {
        const loader = document.getElementById('loader');
        if (!loader) {
            clearInterval(intervalId); // stop checking
                console.log("Loader gone");
                actualTotalPriceUpdate();     // run your code
        }
    }, 100);
}

function actualTotalPriceUpdate() {
    const totalPriceBdi = document.querySelector('.total_price td:last-child span bdi');
    let basePrice = getPrice('.single_price .woocommerce-Price-amount bdi');
    let clipPrice = getPrice('.cut_price .woocommerce-Price-amount bdi')
    let totalPrice = basePrice + clipPrice;
    if (holesEnabled) {
        totalPrice += updateHolePrice();
    }
    if (cornersEnabled) {
        totalPrice += updateCornerPrice();
    }
    if (lakeringEnabled) {
        lakeringPrice = actualCalculateLakeringPrice();
        if (typeof lakeringPrice !== "undefined") {
            totalPrice += lakeringPrice;
        }
    }
    totalPriceBdi.innerHTML = formatPrice(totalPrice + " kr.");
}

function getPrice(field) {
    const priceElement = document.querySelector(field);
    let priceText = priceElement.textContent.trim();
    priceText = priceText.replace(/[^\d.,]/g, '');
    priceText = priceText.replace(/\.(?=\d{3},)/g, '');
    const priceNumber = parseFloat(priceText.replace(',', '.'));
    return priceNumber;
}

function formatPrice(number) {
    // Convert to fixed 2 decimal places to ensure decimal exists
    const parts = number.split('.'); // ["4459", "13"]
    const integer = parts[0];
    const decimal = parts[1];

    // Add thousands separator if integer has 4 or more digits
    const formattedInteger = integer.length >= 4 
        ? parseInt(integer).toLocaleString('de-DE') // uses dot as thousands separator
        : integer;

    return `${formattedInteger},${decimal}`; // combine with comma
}