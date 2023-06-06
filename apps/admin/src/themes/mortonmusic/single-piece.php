<?php get_header();?>

<?php 
  $images = get_field('preview');
?>

<article class="container-fluid">

<?php while ( have_posts() ) : the_post(); ?>

	<div class="preview col-sm-3">
    <?php 

      $full_score = get_field('full_score');
      $free_download = get_field('free_download_pdf');

      if ($free_download) {
        echo '<a href="'.$full_score.'" target="_blank"><img class="attachment-post-thumbnail wp-post-image default" src="' . get_bloginfo( 'stylesheet_directory' ) . '/img/default-piece-free.jpg" /></a>';
      }
      else if ($full_score) {
        echo '<a href="'.$full_score.'" target="_blank"><img class="attachment-post-thumbnail wp-post-image default" src="' . get_bloginfo( 'stylesheet_directory' ) . '/img/default-piece.jpg" /></a>';
      }
      if ($images) {
        //print_r( $images['sizes']);
        echo '<img class="attachment-post-thumbnail wp-post-image default" src="' . $images[0]['sizes']['poster'] . '" />';
      }
      else {
        echo '<img class="attachment-post-thumbnail wp-post-image default" src="' . get_bloginfo( 'stylesheet_directory' ) . '/img/default-piece.jpg" />';
      }
    ?>


  <?php   

      if ($free_download) {
        echo "<a class='button download' target='_blank' href='$free_download'>Download now</a>";
      }
      
      $aus = get_field('australian_distributor_link');
      if ($aus){
        echo "<a class='button australian' target='_blank' href='$aus'>Order Here - Australia</a>";
      }

      $usa= get_field('Usa_distributor_link');
      if ($usa){
        echo "<a class='button usa' target='_blank' href='$usa'>Order Here - USA</a>";
      }

      $international = get_field('international_distributor_link');
      if ($international){
        echo "<a class='button international' target='_blank' href='$international'>Order Here - Other Countries</a>";
      }

      $full_score = get_field('full_score');
      if ($full_score) {
        echo "<a class='button full-score' target='_blank' href='$full_score'>Download score for free</a>";
      }

    ?>
        
	</div>

	<div class="col-sm-9 last">
    <header class="">
			<h1><?php the_title();?></h1>
      <div class="meta">#<?php the_field('catalogue_number');?></div>
    </header>

			<?php echo get_the_term_list( $post->ID, 'composer', '<span class="composer">By ', ', ', '</span>' ) ?><br>

			<?php echo get_the_term_list( $post->ID, 'voicing', '<span class="voicing">Voicing ', ', ', '</span>' ) ?>

			<?php mm_itunes_preivew();?>

     

      <?php
      if ( function_exists( 'sharing_display' ) ) {
          sharing_display( '', true );
      }
      if ( class_exists( 'Jetpack_Likes' ) ) {
          $custom_likes = new Jetpack_Likes;
          echo $custom_likes->post_likes( '' );
      }
?>
    
	<section class="tabs">


  <?php $youTube = get_field('youtube_link');?>
  <!-- Nav tabs -->

    <ul class="nav nav-tabs" role="tablist">
      <li role="presentation" class="active"><a href="#description" aria-controls="description" role="tab" data-toggle="tab">Description</a></li>
      <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Reviews</a></li>
      <?php if ($youTube) { ?>
          <li role="presentation"><a href="#video" aria-controls="video" role="tab" data-toggle="tab">Video Preview</a></li>
      <?php  } ?>
      <li role="presentation" class="preview-tab"><a href="#document-preview" aria-controls="document-preview" role="tab" data-toggle="tab">Previews</a></li>

    </ul>

    <!-- Tab panes -->
    <div class="tab-content">

      <div role="tabpanel" class="tab-pane active" id="description"><?php the_content();?></div>

      <div role="tabpanel" class="tab-pane" id="profile"><p>Coming soon</p>
        <?php if ($youTube) { ?>
          <div role="tabpanel" class="tab-pane" id="video">
            <div class="embed-container">
              <?php echo apply_filters('the_content', $youTube);?>
            </div>
          </div>
        <?php  } ?>
      </div>

      <div role="tabpanel" class="tab-pane" id="document-preview">
        <?php
          if( $images ): ?>
            <ul class="preview-list row">
              <?php foreach( $images as $image ): ?>
                <li class="col-md-2">
                  <a href="<?php echo $image['url']; ?>" class="fluid">
                    <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" />
                  </a>
                </li>
              <?php endforeach; ?>
            </ul>
        <?php else: ?>
          <em>No previews available</em>
        <?php endif; ?>
      </div>

    </div><!-- .tab-content -->

</section>


<?php endwhile; ?>


</article>

<nav class="prev-next-nav col-md-6 pull-right">
  <div class="container-fluid">
    <div class="col-sm-12">
      <h5>More</h5>
      <?php previous_post_link( '%link' ); ?>
      <?php next_post_link( '%link' ); ?>
    </div>
</div>

</nav>

<?php get_footer();?>