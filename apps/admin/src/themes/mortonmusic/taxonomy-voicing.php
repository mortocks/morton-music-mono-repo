<?php get_header();?>


<div class="container-fluid content">

	<h1 class="title">Voicing: <?php single_term_title(); ?></h1>



<table class="table catalogue-list">
			<tr class="heading">
				<th></th>
				<th class="title">Title</th>
				<th>Description</th>
				<th>Composer</th>
				<th>Voicing</th>
			</tr>

	<?php while ( have_posts() ) : the_post(); ?>
	  <tr class="clearfix">
			<?php if ( has_post_thumbnail() ) : ?>
	          <td class="preview col-xs-4 col-md-1"><a href="<?php the_permalink();?>"><?php the_post_thumbnail(); ?></a></td>
	        <?php else: ?>
	            <?php 	echo '<td class="preview col-xs-4"><a href="'.get_the_permalink().'"><img src="' . get_bloginfo( 'stylesheet_directory' ) . '/img/default-piece.jpg" /></a></td>';?>
	            <?php 	//echo '<img src="http://placehold.it/300x420" />';?>

	        <?php endif;?>

				<td class="title col-xs-8">
					<h4><a href="<?php the_permalink();?>"><?php the_title();?></a></h4>
					<div class="meta">#<?php the_field('catalogue_number');?></div>
				</td>
				<td><?php the_content();?></td>
				<td class="composer"><?php echo get_the_term_list( $post->ID, 'composer', '<p class="composer">', ', ', '</p>' ) ?></td>

				<td class="voicing"><?php echo get_the_term_list( $post->ID, 'voicing', '<p class="voicing">', ', ', '</p>' ) ?></td>

		</div>
	  </tr>


	<?php endwhile; ?>

	</table>

<div class="col-md-12">
	<?php numeric_posts_nav();?>
</div>

</div>

<?php get_footer();?>