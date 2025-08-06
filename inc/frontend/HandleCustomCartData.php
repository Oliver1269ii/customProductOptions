<?php 
/**
 * @package staaletCustomOptions
 * Remember to change which filetypes get accepted for the schem uploads
 */

namespace inc\frontend;

class HandleCustomCartData {
    public static function register() {
        add_filter('woocommerce_add_cart_item_data', [self::class, 'addCustomOptionsToCart'], 10, 2);
        add_filter('woocommerce_get_cart_item_from_session', [self::class, 'preserveDataWhenRestoring'], 10, 2);
        add_filter('woocommerce_get_item_data', [self::class, 'displayDataInCart'], 10, 2);
        add_action('woocommerce_checkout_create_order_line_item', [self::class, 'saveOptionsToOrder'], 10, 4);
    }
    public static function addCustomOptionsToCart($cart_item_data, $product_id) {
        if (isset($_POST['holes_choice']) && $_POST['holes_choice'] === 'Yes') {
            $cart_item_data['holes'] = floatval($_POST['holes_quantity']) . __('pc.', 'staaletCustomOptions');
            
            if (isset($_POST['holes_quantity']) && !empty($_POST['holes_quantity'])) {
                $cart_item_data['holes_quantity'] = intval($_POST['holes_quantity']);
            }

            if (isset($_POST['holes_diameter']) && !empty($_POST['holes_diameter'])) {
                $cart_item_data['holes_diameter'] = floatval($_POST['holes_diameter']);
            }

            if (isset($_FILES['holes_schematic']) && !empty($_FILES['holes_schematic']['name'])) {
                require_once ABSPATH . 'wp-admin/includes/file.php';
                $upload = wp_handle_upload($_FILES['holes_schematic'], ['test_form' => false]);
                
                if (!isset($upload['error'])) {
                    $cart_item_data['holes_schematic'] = $upload['url'];
                }
            }
        }

        if (isset($_POST['corners_choice']) && $_POST['corners_choice'] === 'Yes') {
            $cart_item_data['corners'] = intval($_POST['corners_quantity']) .  __('pc.', 'staaletCustomOptions');
            
            if (isset($_POST['corners_quantity']) && !empty($_POST['corners_quantity'])) {
                $cart_item_data['corners_quantity'] = intval($_POST['corners_quantity']);
            }
            
            if (isset($_POST['corners_radius']) && !empty($_POST['corners_radius'])) {
                $cart_item_data['corners_radius'] = floatval($_POST['corners_radius']);
            }
            
            // Handle corners schematic upload
            if (isset($_FILES['corners_schematic']) && !empty($_FILES['corners_schematic']['name'])) {
                require_once ABSPATH . 'wp-admin/includes/file.php';
                $upload = wp_handle_upload($_FILES['corners_schematic'], ['test_form' => false]);
                
                if (!isset($upload['error'])) {
                    $cart_item_data['corners_schematic'] = $upload['url'];
                }
            }
        }

        if (isset($_POST['lakering_choice']) && $_POST['lakering_choice'] === 'Yes') {
            $cart_item_data['lakering'] = 'Yes';
            $length = isset($_POST['length']) ? floatval($_POST['length']) : 0;
            $width = isset($_POST['width']) ? floatval($_POST['width']) : 0;
            $quantity = isset($_POST['quantity']) ? intval($_POST['quantity']) : 1;
            
            if ($length > 0 && $width > 0 && $quantity > 0) {
                $lakering_price = ($length * $width) / 1000000 * 2 * $quantity * 250;
                if ($lakering_price < 500) {
                    $lakering_price += 350;
                }
                $lakering_price *= 1.25;
                $lakering_price = ceil($lakering_price);
                $cart_item_data['lakering_price'] = $lakering_price;
            }
        }

        if (isset($cart_item_data['holes']) || isset($cart_item_data['corners']) || isset($cart_item_data['lakering'])) {
            $cart_item_data['unique_key'] = md5(microtime());
        }

        return $cart_item_data;
    }

    public static function preserveDataWhenRestoring($cart_item, $values) {
        $fields = ['holes','holes_quantity' , 'holes_diameter', 'holes_schematic', 'corners','corners_quantity', 'corners_radius', 'corners_schematic', 'lakering', 'lakering_price', 'unique_key'];
        foreach ($fields as $field) {
            if (isset($values[$field])) {
                $cart_item[$field] = $values[$field];
            }
        }
        return $cart_item;
    }

    public static function displayDataInCart($item_data, $cart_item) {
        if (!empty($cart_item['holes'])) {
            $item_data[] = array(
                'key' => __('Holes', 'staaletCustomOptions'),
                'value' => $cart_item['holes']
            );
        }
        if (!empty($cart_item['holes_diameter'])) {
            $item_data[] = array(
                'key' => __('Holes Diameter', 'staaletCustomOptions'),
                'value' => $cart_item['holes_diameter'] . ' mm'
            );
        }
        if (!empty($cart_item['holes_schematic'])) {
            $item_data[] = array(
                'key' => __('Holes Schematic', 'staaletCustomOptions'),
                'value' => basename($cart_item['holes_schematic'])
            );
        }

        if (!empty($cart_item['corners'])) {
            $item_data[] = array(
                'key' => __('Corners', 'staaletCustomOptions'),
                'value' => $cart_item['corners']
            );
        }
        if (!empty($cart_item['corners_radius'])) {
            $item_data[] = array(
                'key' => __('Corner Radius', 'staaletCustomOptions'),
                'value' => $cart_item['corners_radius'] . ' mm'
            );
        }
        if (!empty($cart_item['corners_schematic'])) {
            $item_data[] = array(
                'key' => __('Corners Schematic', 'staaletCustomOptions'),
                'value' => basename($cart_item['corners_schematic'])
            );
        }

        if (!empty($cart_item['lakering'])) {
            $item_data[] = array(
                'key' => __('Lakering', 'staaletCustomOptions'),
                'value' => __('Yes', 'staaletCustomOptions')
            );
        }
        return $item_data;
    }
    
    public static function saveOptionsToOrder($item, $cart_item_key, $values, $order) {
        $fields = [
            'holes' => __('Holes', 'staaletCustomOptions'),
            'holes_diameter' => __('Holes Diameter (mm)', 'staaletCustomOptions'),
            'holes_schematic' => __('Holes Schematic URL', 'staaletCustomOptions'),
            'corners' => __('Rounded Corners', 'staaletCustomOptions'),
            'corners_radius' => __('Corner Radius (mm)', 'staaletCustomOptions'),
            'corners_schematic' => __('Corners Schematic URL', 'staaletCustomOptions'),
            'lakering' => __('Lakering', 'staaletCustomOptions'),
        ];
        
        foreach ($fields as $key => $label) {
            if (!empty($values[$key])) {
                $value = $values[$key];
                if (strpos($key, 'schematic') !== false) {
                    $value = esc_url($value);
                }
                $item->add_meta_data($label, $value, true);
            }
        }
    }
}