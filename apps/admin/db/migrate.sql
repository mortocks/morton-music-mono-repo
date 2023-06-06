--
-- Migrate the production database to local development
--

-- update urls

UPDATE wp_options SET option_value = replace(option_value, 'https://mortonmusic.com', 'http://localhost:8000') WHERE option_name = 'home' OR option_name = 'siteurl';

UPDATE wp_posts SET guid = replace(guid, 'https://mortonmusic.com','http://localhost:8000');

UPDATE wp_posts SET post_content = replace(post_content, 'https://mortonmusic.com', 'http://localhost:8000');

UPDATE wp_postmeta SET meta_value = replace(meta_value,'https://mortonmusic.com','http://localhost:8000');


UPDATE wp_users SET user_pass = MD5('password');