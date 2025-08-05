<?php
/**
 * @package staaletCustomOptions
 */
namespace Inc\base;

class Enqueue{
    public static function register(){
        add_action('wp_enqueue_scripts', [self::class, 'custom_option_enqueue']);
    }

    public static function custom_option_enqueue(){
        if (is_product()){
            global $post;
            $enabled = get_post_meta($post->ID, '_enable_custom_options', true);
            if ($enabled === 'yes') {
                wp_enqueue_script(
                    'CustomOptionsScript',
                    plugin_dir_url( dirname( __FILE__, 2 ) ) . 'assets/js/FrontendCustomOptionsHandler.js',
                    array(),
                    '1.0',
                    true
                );
            }
        }
    }

}