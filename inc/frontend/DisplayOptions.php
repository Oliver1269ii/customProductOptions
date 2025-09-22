<?php 
/**
 * @package staaletCustomOptions
 * Remember to change which filetypes get accepted for the schem uploads
 */

namespace inc\frontend;

class DisplayOptions{
    public static function register(){
        add_action('woocommerce_before_add_to_cart_button', [self::class, 'display_options']);
    }
    
    public static function display_options(){
        global $product;
        $initialHolePrice = '0,00 kr.';
        $initialCornerPrice = '200,00 kr.';
        $firstHolePrice = $GLOBALS['firstHolePrice'];
        $additionalHolePrice = $GLOBALS['additionalHolePrice'];
        $cornerPrice = $GLOBALS['cornerPrice'];
        ?>
        <p style="display: none;" id="configFirstHolePrice"><?php echo $firstHolePrice; ?></p>
        <p style="display: none;" id="configAdditionalHolePrice"><?php echo $additionalHolePrice; ?></p>
        <p style="display: none;" id="configCornerPrice"><?php echo $cornerPrice; ?></p>
        <table class="aveo_calculator cubric">
                <tbody>
                <tr>
                    <td class="header" colspan="2">Tykkelse</td>
                </tr>
                <tr>
                    <td colspan="2">
                        <select name="height" style="width: 100%" required="">
                            <option selected="true" disabled="disabled" value="">Vælg tykkelse</option>
                            <option value="1">1 mm</option><option value="1.5">1.5 mm</option><option value="2">2 mm</option><option value="3">3 mm</option><option value="4">4 mm</option><option value="5">5 mm</option><option value="6">6 mm</option><option value="8">8 mm</option><option value="10">10 mm</option>                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Længde (mm)<br>
                        <span>Mellem 30mm og 3000mm</span></td>
                    <td><input type="number" name="length" step="1" min="30" max="3000" value="" class="input-text" placeholder="100" required=""></td>
                </tr>
                <tr>
                    <td>Bredde (mm)<br>
                        <span>Mellem 30mm og 1500mm</span></td>
                    <td><input type="number" name="width" step="1" min="30" max="1500" value="" class="input-text" placeholder="100" required=""></td>
                </tr>
                <tr class="single_price"><td>Pris pr. stk</td><td><span class="woocommerce-Price-amount amount"><bdi>3.500,13&nbsp;<span class="woocommerce-Price-currencySymbol">kr.</span></bdi></span></td></tr>
                <tr class="cut_price"><td>Klip</td><td><span class="woocommerce-Price-amount amount"><bdi>20,00&nbsp;<span class="woocommerce-Price-currencySymbol">kr.</span></bdi></span></td></tr>
                <tr class="total_price"><td>Total Pris</td><td><span class="woocommerce-Price-amount amount"><bdi>3.500,00&nbsp;<span class="woocommerce-Price-currencySymbol">kr.</span></bdi></span></td></tr>
                </tbody>
            </table>
        <?php
        if (get_post_meta($product->get_id(), '_enable_custom_options', true) === 'yes') { // check if this gives errors when set to no, if so, make a check to see if its set
            echo '<div class="customOptions">';
            echo '<p>Eksta Tilbehør</p>';
            echo '<fieldset class="customOptions">';
            if (self::getPostMeta('_enable_holes')) { 
                ?>
                    <legend class="legend-inline">
                        <strong><?php _e('Huller', 'staaletCustomOptions'); ?></strong>
                        <i id="holePrice" class="holePrice" style="display: none;"><?php echo $initialHolePrice; ?></i>
                    </legend>
                    <div class="radio-group">
                        <label><input type="radio" class="radioLeft" name="holes_choice" value="Yes"> <?php _e('Ja', 'staaletCustomOptions'); ?></label>
                        <label><input type="radio" class="radioRight" name="holes_choice" value="No" checked> <?php _e('Nej', 'staaletCustomOptions'); ?></label>
                    </div>
                    <?php 
                ?>
                <div id="holes-options" style="display: none; margin: 10px;">
                    <p>
                        <label for="holes_quantity"><?php _e('Antal *', 'staaletCustomOptions'); ?></label>
                        <input type="number" name="holes_quantity" id="holes_quantity" min="1"/>
                    </p>
                <?php
            }

            echo '</div>';
            echo '<p id="mailNotifyHoles" class="mailNotify" style="display: none;">Efter betaling vil du modtage en mail, hvor du skal indtaste de specifikke dimensioner på dine ønsker</p>';
            echo '</fieldset>';
            

            if (self::getPostMeta('_enable_rounded_corners')) {
                echo '<fieldset class="customOptions">';
                ?>
                <legend class="legend-inline">
                    <strong><?php _e('Rundede Hjørner', 'staaletCustomOptions'); ?></strong>
                    <i id="cornerPrice" class="cornerPrice" style="display: none;"><?php echo $initialCornerPrice; ?></i>
                </legend>
                <div class="radio-group">
                    <label><input type="radio" class="radioLeft" name="corners_choice" value="Yes"> <?php _e('Ja', 'staaletCustomOptions'); ?></label>
                    <label><input type="radio" class="radioRight" name="corners_choice" value="No" checked> <?php _e('Nej', 'staaletCustomOptions'); ?></label>
                </div> 
                <?php
            
            ?>
                <div id="corners-options" style="display: none; margin: 10px;">
                    <p>
                        <label for="corners_quantity"><?php _e('Antal *', 'staaletCustomOptions'); ?></label>
                        <input type="number" name="corners_quantity" id="corners_quantity" min="1" max="4"/>
                    </p> 
            </div>
            <p id="mailNotifyCorner" class="mailNotify" style="display: none;">Efter betaling vil du modtage en mail, hvor du skal indtaste de specifikke dimensioner på dine ønsker</p>
            </fieldset>
            <?php
            }
            if (self::getPostMeta('_enable_lakering')) {
            ?>
                <fieldset id="lakeringFieldset" class="staalet-custom-option-groups">
                <legend class="legend-inline">
                    <strong>Lakering</strong>
                    <i class="lakeringPrice" id="lakeringPriceDropDown" style="display: none;">0 kr.</i>
                </legend>
                <div class="radio-group">
                <label>
                    <input type="radio" class="radioLeft" name="lakering_choice" value="Yes"> <?php _e('Ja', 'staaletCustomOptions'); ?>
                </label>
                <label>
                    <input type="radio" class="radioRight" name="lakering_choice" value="No" checked> <?php _e('Nej', 'staaletCustomOptions'); ?>
                </label>
                </div>
            <p id="mailNotifyLakering" class="mailNotify" style="display: none;">Efter betaling vil du modtage en mail, hvor du skal indtaste de specifikke dimensioner på dine ønsker</p>
            </fieldset>
            <?php
            }
            echo '</div>';

        }

    }
    public static function getPostMeta($option){
        global $product;
        if (get_post_meta($product->get_id(), $option, true) === 'yes') {
            return true;
        } else {
            return false;
        }
    }
}