<?php get_header();?>

<div class="container-fluid">
	<div class="col-md-12">
	<?php while ( have_posts() ) : the_post(); ?>
		
		<h1><?php the_title();?></h1>

		<div class="post-content">
			<?php the_content();?>
		</div>
	<?php endwhile;?>
	</div>
</div>




<?php get_footer();?>