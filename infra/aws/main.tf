module "admin" {
  source = "../../apps/admin/infra/aws"
}

module "frontend" {
  source = "../../apps/frontend/infra/aws"
}