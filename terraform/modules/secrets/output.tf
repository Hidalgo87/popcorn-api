output "secret_name" {
  value = google_secret_manager_secret.db_password.secret_id
}