<?php

/**
 * Plugin Name: LDC2020 Blocks
 * Description: Gutenberg Blocks for LDC2020 Theme.
 * Author: Simplicity Partners
 * Text Domain: michel-blocks
 */

if (!defined('ABSPATH')) {
    exit;
}


function ldc_register_dynamic_block($block, $options = array())
{

    register_block_type(
        'ldc/' . $block,
        array_merge(
            array(
                'editor_script' => 'michel-blocks-editor-script',
                'editor_style' => 'michel-blocks-editor-style',
                // 'style' => 'michel-blocks-style'
            ),
            $options
        )
    );
}

function ldc2020_blocks_register()
{

    wp_register_script(
        'michel-blocks-editor-script',
        plugins_url('dist/js/editor.blocks.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components'),
        false,
        true
    );

    wp_register_style(
        'michel-blocks-editor-style',
        plugins_url('dist/css/blocks.editor.css', __FILE__),
        array("michel-blocks-style")
    );

    /* I'm deferring this style to optimize the pageload

    wp_register_style(
        'michel-blocks-style',
        plugins_url('dist/css/blocks.style.css', __FILE__),
        array()
    );

    */

    require_once plugin_dir_path(__FILE__) . '/inc/register-blocks.php';
}

add_action('init', 'ldc2020_blocks_register');

// register and enqueue loadCSS
function ldc2020_blocks_load_scripts_and_styles() {
    
    // register loadCSS
    wp_register_script( 'michel-blocks-load-css-async', plugins_url('src/js/loadCSS.js', __FILE__), array(), '', false );
    
    // enqueue loadCSS
    wp_enqueue_script( 'michel-blocks-load-css-async' );

    // send vars from php to js
    $translation_array = array( 'plugin_path' => plugins_url() . "/michel-blocks" );
    wp_localize_script( 'michel-blocks-load-css-async', 'plugin_vars', $translation_array );    
    
}

add_action('wp_enqueue_scripts', 'ldc2020_blocks_load_scripts_and_styles', 999);

function ldc2020_blocks_assets_frontend()
{

    if ( !is_admin() ) {
        // Enqueue Frontend blocks JS
        wp_enqueue_script(
            'michel-blocks-frontend-js',
            plugins_url('dist/js/frontend.blocks.js', __FILE__),
            ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-api'],
            filemtime( plugin_dir_path(__FILE__) . 'dist/js/frontend.blocks.js' ),
            true
        );
    }
}

add_action('enqueue_block_assets', 'ldc2020_blocks_assets_frontend');


function prefix_disable_gutenberg($current_status, $post_type)
{
    if ($post_type === 'location') return false;
    return $current_status;
}
add_filter('use_block_editor_for_post_type', 'prefix_disable_gutenberg', 10, 2);


add_filter( 'block_editor_settings' , 'remove_guten_wrapper_styles' );
function remove_guten_wrapper_styles( $settings ) {
    unset($settings['styles'][0]);

    return $settings;
}

function ldc_acf_add_google_map_api_key( $api ){
	$api['key'] = 'GOOGLE_API_HERE';
	return $api;
}

add_filter('acf/fields/google_map/api', 'ldc_acf_add_google_map_api_key');