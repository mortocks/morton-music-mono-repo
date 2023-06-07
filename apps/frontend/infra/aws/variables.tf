variable "aws_region" {
  description = "The AWS region for all resources"
  type        = string
  default     = "ap-southeast-2"
}


variable github_access_token {
  description = "Personal access token from github"
  type = string 
}