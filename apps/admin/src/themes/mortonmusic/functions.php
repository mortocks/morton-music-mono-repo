<?php 

add_action( 'admin_menu', 'my_remove_menu_pages' );
function my_remove_menu_pages() {
	remove_menu_page('edit.php');
}
add_theme_support( 'post-thumbnails' );


add_filter( 'jetpack_development_mode', '__return_true' );
add_filter( 'use_block_editor_for_post_type', '__return_false' );
require('inc/custom-post-type-peices.php');
require_once('inc/wp_bootstrap_navwalker.php');


function deregister_media_elements(){
	wp_deregister_script('wp-mediaelement');
	wp_deregister_style('wp-mediaelement');
}
add_action('wp_enqueue_scripts','deregister_media_elements');

register_nav_menus( array(
	'main_menu' => 'Main Menu',
	'footer_menu' => 'Footer Menu'
) );

add_image_size('slider', 2000, 1200, true);
add_image_size('poster', 300, 420, true);
add_image_size('sheet_preview', 816, 1056, true);


function jptweak_remove_share() {
    remove_filter( 'the_content', 'sharing_display',19 );
    remove_filter( 'the_excerpt', 'sharing_display',19 );
    if ( class_exists( 'Jetpack_Likes' ) ) {
        remove_filter( 'the_content', array( Jetpack_Likes::init(), 'post_likes' ), 30, 1 );
    }
}
 
add_action( 'loop_start', 'jptweak_remove_share' );



add_action('admin_head', 'my_custom_fonts');

function my_custom_fonts() {
  echo '<link rel="stylesheet" href="'.get_template_directory_uri().'/css/admin.css" type="text/css" media="all" />';
}


function my_login_logo() { ?>
    <style type="text/css">
        .login h1 a {
            background-image: url(<?php echo get_stylesheet_directory_uri(); ?>/img/logo-medium.png);
            background-size: contain;
						width: 100%
        }
    </style>
<?php }
add_action( 'login_enqueue_scripts', 'my_login_logo' );

add_action( 'wp_enqueue_scripts', 'mytheme_scripts' );
/**
 * Enqueue Dashicons style for frontend use
 */
function mytheme_scripts() {
	wp_enqueue_style( 'dashicons' );
}


add_filter('wp_nav_menu_items','add_search_box_to_menu', 10, 2);
function add_search_box_to_menu( $items, $args ) {
    if( $args->theme_location == 'main_menu' )
      //return $items.get_search_form();
      return $items."<li class='search'><a href='#''>Search</a></li>";

    return $items;
}








/*
 *
 * Feature image helpers
 *
 */

function backgroundImage(){
    global $post;

    if(has_post_thumbnail()){
        echo '<style>body{background-image:url('.featureUrl().')}</style>';
    }
}

function backgroundStyle(){
    global $post;

    if(has_post_thumbnail()){
        return 'style="background-image:url('.featureUrl().')"';
    }
}

function featureUrl(){
    global $post;
    $thumb_id = get_post_thumbnail_id();
    $thumb_url_array = wp_get_attachment_image_src($thumb_id, 'slider', true);
    $thumb_url = $thumb_url_array[0];
    return $thumb_url;
}
















function home_slider(){
	global $post;

	// check if the repeater field has rows of data
	if( have_rows('home_slider') ):

	  	echo "<section class='slider'>";

	 	// loop through the rows of data
	    while ( have_rows('home_slider') ) : the_row();

			// display a sub field value
	        $img = get_sub_field('image');
	        $text = get_sub_field('caption');
	  		
	  		echo "<div class='slide' style='background-image:url(".$img['sizes']['slider'].")'>";

	        
	        //echo "<img src=\"".$img['sizes']['slider']."\"/>";
	        echo "<div class='caption container-fluid'>$text</div>";

	  	echo "</div>";

	    endwhile;

	    echo "</section>";

	else :

	    // no rows found

	endif;


}







add_shortcode('categories', 'display_music_categories');
function display_music_categories(){


	$out  = '';	
	$out .= list_composers('col-md-3', -1);
	$out .= list_voicing('col-md-3');
	$out .= list_genre('col-md-3');
	$out .= list_keywords('col-md-3');
	return $out;
}


function list_keywords($class="", $count=15){
	$terms = get_terms( 
		'keywords',
		array(
			'hide_empty' => true,
			'number' => 10,
			'orderby' => 'count',
			'order' => 'DESC'
		) 
	);
	if ( ! empty( $terms ) && ! is_wp_error( $terms ) ){
		$out  = "<ul class='voicing term-list $class'>";
		$out .= '<li><h3>Keywords</h3></li>';
		foreach ( $terms as $term ) {
			$link = get_term_link($term);
			 $out .= '<li><a href="'.$link.'">' . $term->name . '</a></li>';
			 
	 	}
		$out .= '</ul>';
		return $out;
	}
}


function list_composers($class="", $count=15){
	$terms = get_terms( 
		'composer',
		array(
			'hide_empty' => true,
			//'orderby' => 'wpse_last_word'
		) 
	);

 	if ( ! empty( $terms ) && ! is_wp_error( $terms ) ){
     $out  = "<ul class='composers term-list $class'>";
     $out .= '<li><h3>Composers</h3></li>';
     foreach ( $terms as $term ) {
     	if (get_field('featured', $term)):
     		$link = get_term_link($term);
     		$field_name = get_field('display_name', 'composer_' . $term->term_id);
     		$name = ($field_name) ? $field_name : $term->name;
        	$out .= '<li><a href="'.$link.'">' . $name . '</a></li>';
        endif;
        
    }
    	$out .= '<li><a href="'.esc_url( home_url( '/' ) ).'composers">More...</a></li>';
    	$out .= '</ul>';
    	return $out;
 	} 
}

function list_voicing($class=""){

	$terms = get_terms( 'voicing' );
 	if ( ! empty( $terms ) && ! is_wp_error( $terms ) ){
     $out  = "<ul class='voicing term-list $class'>";
     $out .= '<li><h3>Voicing</h3></li>';
     foreach ( $terms as $term ) {
     	$link = get_term_link($term);
        $out .= '<li><a href="'.$link.'">' . $term->name . '</a></li>';
        
    }
    	$out .= '</ul>';
    	return $out;
 	}
}

function list_genre($class=""){

	$terms = get_terms( 'genre' );
 	if ( ! empty( $terms ) && ! is_wp_error( $terms ) ){
     $out  = "<ul class='genre term-list $class'>";
     $out .= '<li><h3>Genre</h3></li>';
     foreach ( $terms as $term ) {
     	$link = get_term_link($term);
        $out .= '<li><a href="'.$link.'">' . $term->name . '</a></li>';
    }
    	$out .= '</ul>';
    	return $out;
 	}
}







function numeric_posts_nav() {

	if( is_singular() )
		return;

	global $wp_query;

	/** Stop execution if there's only 1 page */
	if( $wp_query->max_num_pages <= 1 )
		return;

	$paged = get_query_var( 'paged' ) ? absint( get_query_var( 'paged' ) ) : 1;
	$max   = intval( $wp_query->max_num_pages );

	/**	Add current page to the array */
	if ( $paged >= 1 )
		$links[] = $paged;

	/**	Add the pages around the current page to the array */
	if ( $paged >= 3 ) {
		$links[] = $paged - 1;
		$links[] = $paged - 2;
	}

	if ( ( $paged + 2 ) <= $max ) {
		$links[] = $paged + 2;
		$links[] = $paged + 1;
	}

	echo '<nav class="navigation pagination"><ul>' . "\n";

	/**	Previous Post Link */
	if ( get_previous_posts_link() )
		printf( '<li>%s</li>' . "\n", get_previous_posts_link('Prev') );

	/**	Link to first page, plus ellipses if necessary */
	if ( ! in_array( 1, $links ) ) {
		$class = 1 == $paged ? ' class="active"' : '';

		printf( '<li%s><a href="%s">%s</a></li>' . "\n", $class, esc_url( get_pagenum_link( 1 ) ), '1' );

		if ( ! in_array( 2, $links ) )
			echo '<li>…</li>';
	}

	/**	Link to current page, plus 2 pages in either direction if necessary */
	sort( $links );
	foreach ( (array) $links as $link ) {
		$class = $paged == $link ? ' class="active"' : '';
		printf( '<li%s><a href="%s">%s</a></li>' . "\n", $class, esc_url( get_pagenum_link( $link ) ), $link );
	}

	/**	Link to last page, plus ellipses if necessary */
	if ( ! in_array( $max, $links ) ) {
		if ( ! in_array( $max - 1, $links ) )
			echo '<li>…</li>' . "\n";

		$class = $paged == $max ? ' class="active"' : '';
		printf( '<li%s><a href="%s">%s</a></li>' . "\n", $class, esc_url( get_pagenum_link( $max ) ), $max );
	}

	/**	Next Post Link */
	if ( get_next_posts_link() )
		printf( '<li>%s</li>' . "\n", get_next_posts_link('Next') );

	echo '</ul></nav>' . "\n";

}




function ajax_search_enqueues() {
    	wp_enqueue_script( 'ajax-search', get_stylesheet_directory_uri() . '/js/main.js', array( 'jquery' ), '1.0.0', true );
      wp_localize_script( 'ajax-search', 'myAjax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
    
}

add_action( 'wp_enqueue_scripts', 'ajax_search_enqueues' );









/**
 *
 * Ajax search for frontent
 *
 */

add_action( 'wp_ajax_ajax_search', 'ajax_search' );
add_action( 'wp_ajax_nopriv_ajax_search', 'ajax_search' );
function ajax_search(){

	global $post;

	$query = $_POST['query'];
	
	// Create object to return
	$results = new StdClass();
	$results->music = array();
    $results->pages = array();

    // Do Taxonomy search for composers
	$args = array(
    'orderby'           => 'name', 
    'order'             => 'ASC',
    'hide_empty'        => true, 
    'name__like'        => $query,
    'description__like' => $query
    //'search'            => '', 
	);

    $composers = get_terms(array('composer'), $args);
    //$composer = [];

    
    foreach ($composers as $term) {
    	$composer[] = array(
    		'title' => $term->name,
    		'href'  => get_term_link($term),
    	);
    }
    
    $results->composers = $composer;
    
    // Do search for pages and pieces
    $args = array(
        'post_status' => 'publish',
        's' => $query
    );
    $search = new WP_Query( $args );
        
    if ( $search->have_posts() ) : 
    
			while ( $search->have_posts() ) : $search->the_post();
				
				// $terms = wp_get_post_terms( $post_id, $taxonomy, $args );
				$voices = wp_get_post_terms($post->ID, 'voicing');
				if ($voices){
					$voice = " <em>(" . $voices[0]->name . ")</em>";
				}

				$data = array(
					'href' => get_the_permalink(),
					'title' => get_the_title() . $voice
				);

				$voice = "";
				
				$type = get_post_type( $post->ID );
				switch ($type) {
				    case 'page':
				        $results->pages[] = $data;
				        break;
				    case 'piece':
				        $results->music[] = $data;
				        break;
				    default:
				    	echo '';

				}

			endwhile;
		endif;

		// Count every found object for frontent
		$results->count = count($results->pages) + count($results->composers) + count($results->music);
	
	
	echo json_encode($results);
	die();
}





//http://wordpress.stackexchange.com/questions/166932/how-to-get-next-and-previous-post-links-alphabetically-by-title-across-post-ty/166933#166933
function filter_next_post_sort($sort) {
    $sort = "ORDER BY p.post_title ASC LIMIT 1";
    return $sort;
}
function filter_next_post_where($where) {
    global $post, $wpdb;
    return $wpdb->prepare("WHERE p.post_title > '%s' AND p.post_type = '". get_post_type($post)."' AND p.post_status = 'publish'",$post->post_title);
}

function filter_previous_post_sort($sort) {
    $sort = "ORDER BY p.post_title DESC LIMIT 1";
    return $sort;
}
function filter_previous_post_where($where) {
    global $post, $wpdb;
    return $wpdb->prepare("WHERE p.post_title < '%s' AND p.post_type = '". get_post_type($post)."' AND p.post_status = 'publish'",$post->post_title);
}

add_filter('get_next_post_sort',   'filter_next_post_sort');
add_filter('get_next_post_where',  'filter_next_post_where');

add_filter('get_previous_post_sort',  'filter_previous_post_sort');
add_filter('get_previous_post_where', 'filter_previous_post_where');





/*
	MISC Helpers
 */

/**
 * Order by the last word in the term name
 * @link http://wordpress.stackexchange.com/a/195039/26350
 */
add_filter( 'get_terms_orderby', function( $orderby, $args )
{
	return $orderby;
    if( isset( $args['orderby'] ) && 'wpse_last_word' === $args['orderby'] )  
        $orderby = " SUBSTRING_INDEX( t.name, ' ', -1 ) ";
    return $orderby;
}, 10, 2 );





/**
 * Adds a responsive embed wrapper around oEmbed content
 * @param  string $html The oEmbed markup
 * @param  string $url  The URL being embedded
 * @param  array  $attr An array of attributes
 * @return string       Updated embed markup
 */
function responsive_embed($html, $url, $attr) {
    return $html!=='' ? '<div class="embed-container">'.$html.'</div>' : '';
}
add_filter('embed_oembed_html', 'responsive_embed', 10, 3);





add_filter( 'graphql_connection_max_query_amount', function( $amount, $source, $args, $context, $info  ) {
    $amount = 1000; // increase post limit to 1000
    return $amount;
}, 10, 5 );

function remove_menu () 
{
   remove_menu_page('edit.php');
} 

add_action('admin_menu', 'remove_menu');

add_action('admin_init', function () {
    // Redirect any user trying to access comments page
    global $pagenow;
     
    if ($pagenow === 'edit-comments.php') {
        wp_safe_redirect(admin_url());
        exit;
    }
 
    // Remove comments metabox from dashboard
    remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');
 
    // Disable support for comments and trackbacks in post types
    foreach (get_post_types() as $post_type) {
        if (post_type_supports($post_type, 'comments')) {
            remove_post_type_support($post_type, 'comments');
            remove_post_type_support($post_type, 'trackbacks');
        }
    }
});
 
// Close comments on the front-end
add_filter('comments_open', '__return_false', 20, 2);
add_filter('pings_open', '__return_false', 20, 2);
 
// Hide existing comments
add_filter('comments_array', '__return_empty_array', 10, 2);
 
// Remove comments page in menu
add_action('admin_menu', function () {
    remove_menu_page('edit-comments.php');
});
 
// Remove comments links from admin bar
add_action('init', function () {
    if (is_admin_bar_showing()) {
        remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
    }
});


function is_wpLogin(){
    $ABSPATH_MY = str_replace(array('\\','/'), DIRECTORY_SEPARATOR, ABSPATH);
    return ((in_array($ABSPATH_MY.'wp-login.php', get_included_files()) || in_array($ABSPATH_MY.'wp-register.php', get_included_files()) ) || (isset($_GLOBALS['pagenow']) && $GLOBALS['pagenow'] === 'wp-login.php') || $_SERVER['PHP_SELF']== '/wp-login.php');
}


// Disable front end
function redirect_to_backend() {
    if( !is_admin() && !is_wpLogin() ) {
        wp_redirect( site_url('wp-admin') );
        exit();
    }
}
add_action( 'init', 'redirect_to_backend' );