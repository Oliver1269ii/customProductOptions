<?php
/**
 * @package staaletCustomOptions
 */

namespace inc\base;

 class Deactivate {
    public static function deactivate() {
        flush_rewrite_rules();
    }
 }