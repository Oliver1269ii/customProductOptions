<?php
/**
 * @package staaletCustomOptions
 * Remember to change which filetypes get accepted for the schem uploads
 */

namespace inc\frontend;

class HandleCustomFees {
    public static function register() {
        add_action('woocommerce_cart_calculate_fees', [self::class, 'processFees']);

        // Fallback: if we ever have to append a hidden "|id" to the fee name (legacy WC),
        // make sure customers never see it.
        add_filter('woocommerce_get_fee_name', function ($name, $fee) {
            if (strpos($name, '|') !== false) {
                $name = explode('|', $name)[0];
            }
            return $name;
        }, 10, 2);
    }

    public static function processFees($cart) {
        // Prices
        $firstHolePrice = $GLOBALS["firstHolePrice"];
        $additionalHolePrice = $GLOBALS["additionalHolePrice"];
        $cornerPrice = $GLOBALS['cornerPrice'];

        if (is_admin() && ! defined('DOING_AJAX')) {
            return;
        }

        // Use new Fees API when available; otherwise we’ll fall back.
        $use_fees_api = method_exists($cart, 'fees_api') && is_object($cart->fees_api());

        foreach ($cart->get_cart() as $cart_item_key => $cart_item) {
            $quantity = isset($cart_item['quantity']) ? (int) $cart_item['quantity'] : 1;
            $fees_to_add = [];

            // --- Holes ---
            if (!empty($cart_item['holes']) && !empty($cart_item['holes_quantity'])) {
                $holes_qty = (int) $cart_item['holes_quantity'];
                if ($holes_qty > 0) {
                    $holes_fee = $firstHolePrice + max(0, $holes_qty - 1) * $additionalHolePrice;
                    $fees_to_add[] = [
                        'id'     => "holes_{$cart_item_key}",
                        'name'   => sprintf(__('Huller (x %d)', 'staaletCustomOptions'), $holes_qty),
                        'amount' => $holes_fee * $quantity,
                    ];
                }
            }

            // --- Rounded corners ---
            if (!empty($cart_item['corners']) && !empty($cart_item['corners_quantity'])) {
                $corners_qty = (int) $cart_item['corners_quantity'];
                if ($corners_qty > 0) {
                    $corners_fee = $cornerPrice * $corners_qty;
                    $fees_to_add[] = [
                        'id'     => "corners_{$cart_item_key}",
                        'name'   => sprintf(__('Afrundede Hjørner (x %d)', 'staaletCustomOptions'), $corners_qty),
                        'amount' => $corners_fee * $quantity,
                    ];
                }
            }

            // --- Painting (Lakering) ---
            if (!empty($cart_item['lakering']) && !empty($cart_item['lakering_price'])) {
                $lakering_fee = (float) $cart_item['lakering_price'];
                $fees_to_add[] = [
                    'id'     => "lakering_{$cart_item_key}",
                    'name'   => __('Lakering', 'staaletCustomOptions'),
                    'amount' => $lakering_fee, // already calculated per quantity upstream
                ];
            }

            // Add fees
            foreach ($fees_to_add as $fee) {
                $fee_id = sanitize_key($fee['id']);

                if ($use_fees_api) {
                    // New API: id is internal only (not shown to customer)
                    $cart->fees_api()->add_fee([
                        'id'        => $fee_id,
                        'name'      => $fee['name'],
                        'amount'    => $fee['amount'],
                        'taxable'   => false, // change if your fees are taxable
                        'tax_class' => '',
                    ]);
                } else {
                    // Legacy fallback: encode uniqueness into the name; our filter hides it from display.
                    $cart->add_fee($fee['name'] . '|' . $fee_id, $fee['amount'], false, '');
                }
            }
        }
    }
}
