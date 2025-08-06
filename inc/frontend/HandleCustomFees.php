<?php 
/**
 * @package staaletCustomOptions
 * Remember to change which filetypes get accepted for the schem uploads
 */

namespace inc\frontend;

class HandleCustomFees {
    public static function register() {
        add_action( 'woocommerce_cart_calculate_fees', [self::class, 'processFees'] );
    }
    public static function processFees($cart) {
        if ( is_admin() && !defined( 'DOING_AJAX' ) ) return;
        foreach ($cart->get_cart() as $cart_item_key => $cart_item) {
            $quantity = isset($cart_item['quantity']) ? $cart_item['quantity'] : 1;
            $fees = [];
            if (!empty($cart_item['holes']) && !empty($cart_item['holes_quantity'])) {
                $holes_qty = intval($cart_item['holes_quantity']);
                $holes_fee = 150 + (($holes_qty - 1) * 50); // First hole 150 DKK, each additional +50 DKK
                $fees[] = [
                    'name' => sprintf(__('(%s) Holes Fee (x %d)', 'staaletCustomOptions'), substr( $cart_item_key, 0, 6 ), $holes_qty),
                    'amount' => $holes_fee * $quantity
                ];
            }
        

        if (!empty($cart_item['corners']) && !empty($cart_item['corners_quantity'])) {
            $corners_qty = intval($cart_item['corners_quantity']);
            $corners_fee = 50 * $corners_qty; // 50 DKK per corner
            $fees[] = [
                'name' => sprintf(__('(%s) Rounded Corners Fee (x%d)', 'staaletCustomOptions'), substr( $cart_item_key, 0, 6 ), $corners_qty),
                'amount' => $corners_fee * $quantity
            ];
        }

        if (!empty($cart_item['lakering']) && !empty($cart_item['lakering_price'])) {
            $lakering_fee = floatval($cart_item['lakering_price']);
            $fees[] = [
                'name' => sprintf(__('(%s) Lakering Fee', 'staaletCustomOptions'), substr( $cart_item_key, 0, 6 )),
                'amount' => $lakering_fee // Already calculated per quantity
            ];
        }
        foreach ($fees as $fee) {
            $cart->add_fee($fee['name'], $fee['amount']);
        }
    }
}
}