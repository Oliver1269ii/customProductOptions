<?php
/**
 * @package staaletCustomOptions
 */

namespace inc\base;

 class Activate {
    public static function activate() {
        flush_rewrite_rules();
    }
 }