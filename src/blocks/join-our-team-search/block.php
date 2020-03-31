<?php

ldc_register_dynamic_block('mop-join-our-team-search', array(
    'render_callback' => 'ldc2020_blocks_render_join_our_team_search',
    'attributes' => array(
        'title' => array(
            'type' => "string",
            'default' => "Join our talented team"
        ),
        'categoryLabel' => array(
            'type' => "string",
            'default' => "I'm interested in joining"
        ),
        'locationLabel' => array(
            'type' => "string",
            'default' => "in"
        ),
        'bgImage' => array(
            'type' => "string"
        )
    )
));

function ldc2020_blocks_render_join_our_team_search( $attributes ) {

    $output = Timber::compile( plugin_dir_path( __FILE__ ) . 'frontend.twig', [
        'attributes' => $attributes,
        'array_country' => get_options_list_from_ldc_api('country'),
        'array_categories' => get_options_list_from_ldc_api('professional_area')
    ]);
    
    return $output;
}