<?php

ldc_register_dynamic_block('mop-people-listing', array(
    'render_callback' => 'ldc2020_blocks_render_people_listing',
    'attributes' => array(
        'people' => array(
            'type' => "object"
        ),
        'selectedFeaturedPersonId' => array(
            'type' => "integer",
            'default' => 1
        ),
        'quote' => array(
            'type' => "string",
            'default' => "My colleagues are experienced and are completely open to sharing their knowledge."
        ),
        'bgImage' => array(
            'type' => "string",
            'default' => "http://placehold.it/1920x750"
        )
    )
));    

function ldc2020_blocks_render_people_listing( $attributes ) {

    $people = Timber::get_posts( array('post_type' => 'meet-our-people', 'offset' => 1) );
    
    $output = Timber::compile( plugin_dir_path( __FILE__ ) . 'frontend.twig', [
        'attributes' => $attributes,
        'people' => $people
    ]);
    
    return $output;
}