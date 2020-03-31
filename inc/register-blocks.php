<?php
/* 
    ================================================ 
    Add the block folder name into this array
    Only for Dynamic blocks
    ================================================ 
*/

$blocks = [
    "join-our-team-search",
];

foreach ($blocks as $block) {
    require plugin_dir_path( __DIR__ ) . 'src/blocks/'.$block.'/block.php';
}