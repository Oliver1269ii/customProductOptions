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
        $holePrice = '50';
        $cornerPrice = '50';
        if (get_post_meta($product->get_id(), '_enable_custom_options', true) === 'yes') {
            echo '<div class="customOptions">';
            echo '<fieldset class="customOptions">';
            if (self::getPostMeta('_enable_holes')) { 
                ?>
                <legend><strong><?php _e('Huller', 'oliver1269woocommerce'); ?></strong></legend>
                <label>
                    <input type="radio" name="holes_choice" value="Yes"> <?php _e('Ja', 'oliver1269woocommerce'); ?>
                </label><br>
                <label>
                    <input type="radio" name="holes_choice" value="No" checked> <?php _e('Nej', 'oliver1269woocommerce'); ?>
                </label><br>
                <?php 
            }
            ?>
            <div id="holes-options" style="display: none; margin-left: 20px; margin-bottom: 20px;">
                <p>
                    <label for="holes_quantity"><?php _e('Antal *', 'oliver1269woocommerce'); ?></label>
                    <input type="number" name="holes_quantity" id="holes_quantity" min="1" />
                </p>
            <?php
            if (self::getPostMeta('_enable_hole_diameter')) {
                ?>
                <p>
                    <label for="holes_diameter"><?php _e('Diameter (mm)', 'oliver1269woocommerce'); ?></label>
                    <input type="number" name="holes_diameter" id="holes_diameter" min="1" step="0.1" />
                </p>
                <?php
            }
            if (self::getPostMeta('_enable_hole_schematic')) {
                ?>
                <p>
                    <label for="holes_schematic"><?php _e('Skitse', 'oliver1269woocommerce'); ?></label>
                    <input type="file" name="holes_schematic" id="holes_schematic" accept=".pdf,.jpg,.jpeg,.png,.dwg" />
                </p>
                <?php
            }

            echo '</div>';
            echo '<i id="holePrice">+' . $holePrice . '</i>';
            echo '</fieldset>';
            echo '<fieldset class="customOptions">';

            if (self::getPostMeta('_enable_rounded_corners')) {
                ?>
                <legend><strong><?php _e('Rundede Hjørner', 'oliver1269woocommerce'); ?></strong></legend>
                <label>
                    <input type="radio" name="corners_choice" value="Yes"> <?php _e('Ja', 'oliver1269woocommerce'); ?>
                </label><br>
                <label>
                    <input type="radio" name="corners_choice" value="No" checked> <?php _e('Nej', 'oliver1269woocommerce'); ?>
                </label><br>
                <?php
            }
            ?>
            <div id="corners-options" style="display: none; margin-left: 20px; margin-bottom: 20px;">
                <p>
                    <label for="corners_quantity"><?php _e('Antal *', 'oliver1269woocommerce'); ?></label>
                    <input type="number" name="corners_quantity" id="corners_quantity" min="1" />
                </p>
            <?php
            if (self::getPostMeta('_enable_rounded_corners')) {
            ?>
                <p>
                    <label for="corners_radius"><?php _e('Hjørne Radius (mm)', 'oliver1269woocommerce'); ?></label>
                    <input type="number" name="corners_radius" id="corners_radius" min="1" step="0.1" />
                </p>
            <?php
            }
            if (self::getPostMeta('_enable_corner_schematic')) {
            ?>
                <p>
                    <label for="corners_schematic"><?php _e('Skitse', 'oliver1269woocommerce'); ?></label>
                    <input type="file" name="corners_schematic" id="corners_schematic" accept=".pdf,.jpg,.jpeg,.png,.dwg" />
                </p>
                </div>
                <?php echo '<i id="cornerPrice">+' . $cornerPrice . '</i>'; ?>
                </fieldset>
            <?php
            }
            if (self::getPostMeta('_enable_lakering')) {
            ?>
                <fieldset class="oliver-option-groups">
                <legend><strong>Lakering</strong></legend>
                <label>
                    <input type="radio" name="lakering_choice" value="Yes"> <?php _e('Ja', 'oliver1269woocommerce'); ?>
                </label><br>
                <label>
                    <input type="radio" name="lakering_choice" value="No" checked> <?php _e('Nej', 'oliver1269woocommerce'); ?>
                </label><br>
                <i id="lakeringPrice" style="display: none;">0</i>
            </fieldset>
            <?php
            }
            echo '</div>';
            echo '</fieldset>';

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