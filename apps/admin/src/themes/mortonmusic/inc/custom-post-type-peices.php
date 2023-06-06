<? 

/*
 *
 * Create Piece custom post type
 *
*/
function mm_peices_init() {
    $args = array(
      'public' => true,
			'show_in_rest' => true,
      'label'  => 'Piece',
      'menu_position' => 5,
      'has_archive' => true,
      'rewrite' => array( 'slug' => 'catalogue' ), 
      'menu_icon' => 'dashicons-format-audio',
			'supports'  => array( 'title', 'editor', 'thumbnail', 'comments', 'excerpt' ),
			'show_in_graphql' => true,
      'hierarchical' => true,
      'graphql_single_name' => 'piece',
      'graphql_plural_name' => 'pieces',
		);
    register_post_type( 'piece', $args );
}
add_action( 'init', 'mm_peices_init' );


function my_acf_save_post( $post_id ) {
    
    // bail early if no ACF data
    if( empty($_POST['acf']) ) {
        
        return;
        
    }
    
    
    // array of field values
    $fields = $_POST['acf'];


    // specific field value
    $field = $_POST['acf']['field_55e11ad8da3ca'];
    echo $field;
    if (strpos($field, "itunes.apple.com")){

    	// https://itunes.apple.com/lookup?id=484831981
    	// https://itunes.apple.com/au/album/andys-gone-cattle-trad.-australian/id484831977?i=484832162

    	$parts = parse_url($field);
    	print_r($parts);
			parse_str($parts['query'], $query);
			$id =  $query['i'];

    	// Change to ituens preview url
    	$term = urlencode($_POST['term']); // user input 'term' in a form
	    $json =  file_get_contents('https://itunes.apple.com/lookup?id=' . $id);    
	    $array = json_decode($json, true);

	    foreach($array['results'] as $value)
	    {
	        $_POST['acf']['field_55e11ad8da3ca'] = "";
	        //update_post_meta($post_id, $meta_key, $meta_value, $prev_value);
	        update_post_meta($post_id, 'itunes_media', $value);
	    }
    }
    //$_POST['acf']['field_55e11ad8da3ca'] = "http://apple.com";
    
}

// run before ACF saves the $_POST['acf'] data
add_action('acf/save_post', 'my_acf_save_post', 1);




add_action( 'init', 'mm_create_composer_tax' );

function mm_create_composer_tax() {
	register_taxonomy(
		'composer',
		'piece',
		array(
			'label' => __( 'Composer' ),
			'rewrite' => array( 'slug' => 'composer' ),
			'hierarchical' => true,
			'show_in_graphql' => true,
			'graphql_single_name' => 'composer',
			'graphql_plural_name' => 'composers'
		),
	);
	
	
	register_taxonomy(
		'voicing',
		'piece',
		array(
			'label' => __( 'Voicing' ),
			'rewrite' => array( 'slug' => 'voicing' ),
			'hierarchical' => true,
			'show_in_graphql' => true,
			'graphql_single_name' => 'voicing',
			'graphql_plural_name' => 'voicing'
		)
	);


	register_taxonomy(
		'genre',
		'piece',
		array(
			'label' => __( 'Genre' ),
			'rewrite' => array( 'slug' => 'genre' ),
			'hierarchical' => true,
	
		)
	);

	register_taxonomy(
		'keywords',
		'piece',
		array(
			'label' => __( 'Keywords' ),
			'rewrite' => array( 'slug' => 'keywords' ),
			'hierarchical' => false,
		)
	);
}


/* Display the post meta box. */
function itunes_post_class_meta_box( $object, $box ) { 

	$post_id = get_the_ID();
	$itunes = get_post_meta( $post_id, 'itunes_media', true ); 
	//echo "<pre>";print_r($itunes);echo "</pre>"; //[artworkUrl30] => http://is4.mzstatic.com/image/thumb/Music/97/5e/b0/mzi.hxysjvbc.jpg/30x30bb-85.jpg
	if (!$itunes) {
		echo "Add a track from itunes to see the preview";
		return;
	}

	mm_itunes_preivew();

	

}


add_action( 'add_meta_boxes', 'itunes_add_post_meta_boxes' );

function itunes_add_post_meta_boxes(){
	add_meta_box(
    'itunes-post-class',      // Unique ID
    esc_html__( 'iTunes preview', 'example' ),    // Title
    'itunes_post_class_meta_box',   // Callback function
    'piece',         // Admin page (or post type)
    'side',         // Context
    'default'         // Priority
  );
}



function mm_itunes_preivew(){
	global $post; 

	$itunes = get_post_meta( $post->ID, 'itunes_media', true ); 
	//echo "<pre>"; print_r($itunes); echo "</pre>";

	if (!$itunes) return;

	$name   = $itunes['trackName'];
	$src    = $itunes['artworkUrl100'];
	$music  = $itunes['previewUrl'];
	$artist = $itunes['artistName'];
	$artistlink = $itunes['artistViewUrl'];
	$trackurl = $itunes['trackViewUrl'];
	//https://itunes.apple.com/au/album/waltzing-matilda-trad.-australian/id484831977?i=484831981
?>
	
	<div class="itunes-player clearfix" data-itunes-id="484831981">
		<h4>Preview</h4>
		<div class="artwork">
			<a href="<?php $artstlink;?>" target="_blank"><img src="<?php echo $src;?>"/></a>
			<a href="<?php $trackurl;?>" target="_blank"><img src="<?php echo get_template_directory_uri();?>/img/itunes.png" alt="itunes"/></a>
		</div>
		<div class="details">
			<h5 class="name"><?php echo $name;?></h5>
			<div class="artist"><?php echo $artist;?></div>
			<audio controls src="<?php echo $music;?>"></audio>
		</div>
	</div>

  <?php
}








/*
 *
 * Set order to alphabetical
 *
 */
function pieces_post_queries( $query ) {
	// not an admin page and is the main query
	if ( !is_admin() && $query->is_main_query() ) {
		// maybe you have to change 'People' to 'people'
		if ( is_post_type_archive( 'piece' ) || is_tax('composer') || is_tax('voicing') ) {

			$query->set( 'orderby', 'title' );
			$query->set( 'order', 'ASC' );

		}
	}
}
add_action( 'pre_get_posts', 'pieces_post_queries' );

















/* Display custom column */
function display_posts_stickiness( $column, $post_id ) {
    if ($column == 'catalogue_number'){
        the_field('catalogue_number', $post_id);
    } else if ($column == 'composer'){
      echo get_the_term_list( $post_id, 'composer', '', ', ', '' );
    } else if ($column == 'voices'){
      echo get_the_term_list( $post_id, 'voicing', '', ', ', '' );
    }
}
add_action( 'manage_posts_custom_column' , 'display_posts_stickiness', 10, 2 );

/* Add custom column to post list */
function add_sticky_column( $columns ) {
    return array_merge( $columns, 
        array( 
        	'catalogue_number' => __( 'Catalogue Number', 'your_text_domain' ),
        	'composer' => __( 'Composer', 'your_text_domain' ),
        	'voices' => __( 'Voices', 'your_text_domain' )
        	)
        );
}
add_filter( 'manage_posts_columns' , 'add_sticky_column' );


 ?>