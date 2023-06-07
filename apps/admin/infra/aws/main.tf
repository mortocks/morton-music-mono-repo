provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Environment = "Dev"
      Client      = "Graeme Morton"
      Project     = "Moron Music"
    }
  }
}


resource "aws_lightsail_instance" "admin_wordpress" {
  name              = "morton-music-admin-wordpress"
  availability_zone = "ap-southeast-2a"
  blueprint_id      = "wordpress"
  bundle_id         = "micro_2_2" // https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lightsail_instance#suffix
}