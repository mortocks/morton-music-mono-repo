<?php

/*
Template Name: Composers
*/

?>

<?php get_header();?>

<?php 
/**
 * Order by the last word in the term name
 * @link http://wordpress.stackexchange.com/a/195039/26350
 */
add_filter( 'get_terms_orderby', function( $orderby, $args )
{
    if( isset( $args['orderby'] ) && 'wpse_last_word' === $args['orderby'] )  
        $orderby = " SUBSTRING_INDEX( t.name, ' ', -1 ) ";
    return $orderby;
}, 10, 2 );?>


<div class="container-fluid">

	<h1 class="title" ><?php the_title();?></h1>


	
	<?php
		/** 
		 * Snippet Name: List taxonomies by initial letter 
		 * Snippet URL: http://www.wpcustoms.net/snippets/list-taxonomies-by-initial-letter/ 
		 */  
		 $list = '';  
		$args = array(  
		  'hide_empty' => true,  // Set this to true to hide terms with no posts  
		  //'orderby' => 'wpse_last_word'
		);  
		$tags = get_terms('composer',$args);  
		$groups = array(  );  
		  
		if( $tags && is_array( $tags ) ) {  

		  foreach( $tags as $tag ) {  
		  
		  	$name = $tag->name;
		  	$parts = explode(' ', $name);
		  
		  	$last_word = end($parts);
    		$first_letter = strtoupper( $tag->name[0] );  
		 	$last_letter = $last_word[0];

		 	//echo "Last: $last_letter | First $first_letter | LASTWORD $last_word<br>";

		    $groups[ $last_letter ][] = $tag;  
		  } 

		  // Sort groups alphabetically
		  ksort($groups);

		  if( !empty( $groups ) ) {  
		    $index_line = '';  
		    foreach( $groups as $letter => $tags ) {  
		      $list .= '<ul class="composer-list"><li><a class="letter" name="'.$letter.'"><strong>' . apply_filters( 'the_title', $letter ) . '</strong></a></li>';  
		      foreach( $tags as $tag ) {  
		        $name = apply_filters( 'the_title', $tag->name );  
		        $list .= '<li><a href="' . get_term_link( $tag ) . '" title="' . sprintf(__('View all posts tagged with %s', 'yourtheme'), $tag->name) . '">' . $tag->name . ' <small>(' . $tag->count . ')</small></a></li>';  
		      }  
		      $list .= '</ul><hr>';  
		    }  
		    $list .= '';  
		  }  
		} else $list .= '<p>Sorry, but no tags were found</p>';  
		  
		print ($index_line);  
		print ($list);  
?>

</div>

<?php get_footer();?>