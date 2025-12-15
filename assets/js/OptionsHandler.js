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
                <bdi id="cornerTotal" class="cornerPrice">200,00&nbsp;<span class="woocommerce-Price-currencySymbol">kr.</span></bdi>
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
    holesRadios.forEach(radio => {
        radio.addEventListener('change', updateHoles);
    });

    const cornerRadios = document.getElementsByName('corners_choice');
    cornerRadios.forEach(radio => {
        radio.addEventListener('change', updateCorners);
    });

    const lakeringRadios = document.getElementsByName('lakering_choice');
    lakeringRadios.forEach(radio => {
        radio.addEventListener('change', updateLakering);
    });
});
