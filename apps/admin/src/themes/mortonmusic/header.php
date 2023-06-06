<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title><?php wp_title( '|', true, 'left' ); ?></title>

	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

	<link href='https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Merriweather:400,400italic,700,300italic,300,700italic' rel='stylesheet' type='text/css'>
	

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
	<link rel="stylesheet" href="/wp-content/themes/mortonmusic/css/iTunesPreviewPlayer.css">
	<link rel="stylesheet" href="<?php echo get_stylesheet_uri();?>">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fluidbox/2.0.5/css/fluidbox.min.css">
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/fluidbox/2.0.5/js/jquery.fluidbox.min.js"></script>

 <script src="/wp-content/themes/mortonmusic/js/iTunesPreviewPlayer.js"></script>

<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.5.7/slick.css"/>
<script type="text/javascript" src="//cdn.jsdelivr.net/jquery.slick/1.5.7/slick.min.js"></script>
				


	<?php wp_head();?>
</head>
<body <?php body_class(); ?>>
	<header class="clearfix">
	

		<div class="container-fluid">
			<a href="/"><img src="/wp-content/themes/mortonmusic/img/logo.png" alt="Morton Music Logo"></a>

			<div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            
			<?php
			wp_nav_menu( array(
                'menu'              => 'main_menu',
                'theme_location'    => 'main_menu',
                'id'				=> 'navbar',
                'depth'             => 2,
                'container'         => 'nav',
                'container_class'   => 'collapse navbar-collapse navbar-right',
        		'container_id'      => 'navbar',
                'menu_class'        => 'nav navbar-nav navbar',
                'fallback_cb'       => 'wp_bootstrap_navwalker::fallback',
                'walker'            => new wp_bootstrap_navwalker())
            );
            ?>
					
		</div>

		<div id="ajax-search-results">
				<div class="container-fluid">
					<div class="row">
						<div class="col-sm-3">
								<h2>Search</h2>
						</div>
						<div class="col-sm-9">
							<input type="text" placeholder="Search..."/>
						</div>
					</div>
					<div class="row">
						<div class="col-md-4 works">
							<h3>Pieces<em></em></h3>
							<ul class="list"></ul>
						</div>

						<div class="col-md-3 composers">
							<h3>Composers<em></em></h3>
							<ul class="list"></ul>
						</div>

						<div class="col-md-3 pages">
							<h3>Pages<em></em></h3>
							<ul class="list"></ul>
						</div>

						<div class="col-md-2 all-results last">
							<div class="no-results"><a id="js-all-results" href="/s?=about">Show all results</a></div>
						</div>
					</div>

				</div>
		</div>

	</header>
	
