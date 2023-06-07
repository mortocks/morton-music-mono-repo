
terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "morton-music"

    workspaces {
      name = "morton-music"
    }
  }
}