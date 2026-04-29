variable "project_id" {}
variable "environment" {}
variable "db_password" {
  sensitive = true
}