module "admin" {
  source = "../../apps/admin/infra/aws"
}

module "frontend" {
  source              = "../../apps/frontend/infra/aws"
  github_access_token = var.github_access_token
}