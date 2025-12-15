<?php 
/**
 * @package staaletCustomOptions
 */

namespace inc\admin;

class ProductSettings{
    public static function register() {
        add_action( 'woocommerce_product_options_general_product_data', [ self::class, 'generateOptions' ] );
        add_action( 'woocommerce_process_product_meta', [ self::class, 'saveOptions' ] );
    }

    public static function generateOptions() {
        echo '<div class="options_group">';
        echo '<h3>' . __('Custom Options Settings', 'staaletCustomOptions') . '</h3>';
        woocommerce_wp_checkbox(array(
            'id' => '_enable_custom_options',
            'label' => __('Enable Custom Options', 'staaletCustomOptions'),
            'description' => __('Enables custom options for this product.')
        ));
        woocommerce_wp_checkbox(array(
            'id' => '_enable_holes',
            'label' => __('Enable Holes', 'staaletCustomOptions'),
            'description' => __('Allow users to add holes.', 'staaletCustomOptions')
        ));
        
        woocommerce_wp_checkbox(array(
            'id' => '_enable_rounded_corners',
            'label' => __('Enable Rounded Corners', 'staaletCustomOptions'),
            'description' => __('Allow users to add rounded corners.', 'staaletCustomOptions')
        ));
        
        woocommerce_wp_checkbox(array(
            'id' => '_enable_lakering',
            'label' => __('Enable Lakering Option', 'staaletCustomOptions'),
            'description' => __('Allow customers to select lakering option.', 'staaletCustomOptions')
        ));
        
        echo '</div>';
    }

    public static function saveOptions($post_id) {
        $settings = [
            '_enable_custom_options',
            '_enable_holes',
            '_enable_rounded_corners',
            '_enable_lakering'
        ];
        foreach ($settings as $option) {
            $value = isset( $_POST[$option] ) ? 'yes' : 'no';
            update_post_meta( $post_id, $option, $value );
        }
    }
}