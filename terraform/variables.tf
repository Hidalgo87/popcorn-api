variable "project_id" {}
variable "region" {}
variable "zone" {}
variable "environment" {}
variable "db_password" {
  sensitive = true
}