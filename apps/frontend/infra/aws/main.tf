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


resource "aws_amplify_branch" "develop" {
  app_id      = aws_amplify_app.nextjs_app.id
  branch_name = "main"

  enable_auto_build = true

  framework = "Next.js - SSR"
  stage     = "PRODUCTION"

  environment_variables = {
    APP_ENVIRONMENT = "prod"
  }
}

resource "aws_iam_role" "mm_amplify_role" {
  name = "mm_amplify_deploy_terraform_role"

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "amplify.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY

}

resource "aws_route53_zone" "avanicol" {
  name = "avanicol.com"
}

resource "aws_amplify_domain_association" "mm_amplify_domain" {
  domain_name           = "avanicol.com"
  app_id                = aws_amplify_app.nextjs_app.id
  wait_for_verification = false
  sub_domain {
    branch_name = "main" # Replace with your desired branch
    prefix      = ""
  }
}


resource "aws_amplify_app" "nextjs_app" {
  name        = "morton-music-nextjs-app"
  repository  = "https://github.com/mortocks/morton-music-mono-repo" 
  description = "Next.js frontend for morton music store"

  # GitHub personal access token
  access_token = "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"

  iam_service_role_arn = aws_iam_role.mm_amplify_role.arn

  # The default build_spec added by the Amplify Console for React.
  build_spec = <<-EOT
    version: 0.1
    frontend:
      phases:
        preBuild:
          commands:
            - yarn install
        build:
          commands:
            - yarn run build
      artifacts:
        baseDirectory: out
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
  EOT

  enable_auto_branch_creation = true

  enable_branch_auto_build = true

  enable_branch_auto_deletion = true

  platform = "WEB"


  environment_variables = {
    ENV                             = "test"
    ADMIN_API_URL                   = "https://mortonmusic.com/graphql"
    NEXT_PUBLIC_SNIPCART_PUBLIC_KEY = "OTk2YWFlZGItNTc0ZC00OGJkLThjZTQtZjU4NmRmYjMyYjNlNjM4MTk4MzExMjIwNDYyNTUx"
  }

}