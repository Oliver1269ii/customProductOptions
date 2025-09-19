<?php
/**
 * @package staaletCustomOptions
 */
/* 
Plugin Name: Stålet Custom Product Options
Plugin URI: https://github.com/Oliver1269ii/customProductOptions
Description: A custom plugin for custom settings
Version: 1.2.4
Author: Oliver "Oliver1269" Larsen
Author URI: https://github.com/Oliver1269ii
License: GPL-3.0-or-later
Text Domain: staaletcustomoptions
*/

defined('ABSPATH') or die();

if ( file_exists( dirname( __FILE__ ) . '/vendor/autoload.php' ) ) {
	require_once dirname( __FILE__ ) . '/vendor/autoload.php';
}

use inc\base\Activate;
register_activation_hook( __FILE__, function(){ Activate::activate();});

use inc\base\Deactivate;
register_deactivation_hook( __FILE__, function(){ Deactivate::deactivate();});

if ( class_exists( 'inc\\Init' ) ) {
	inc\Init::register_services();
}


$GLOBALS['firstHolePrice'] = 150;
$GLOBALS["additionalHolePrice"] = 50;
$GLOBALS["cornerPrice"] = 50;

// Håndterings gebyr
$GLOBALS['handlingFee'] = 250;
$GLOBALS['handlingFeeText'] = "Håndteringsgebyr (Ved bestillinger under 1000 kr.)";