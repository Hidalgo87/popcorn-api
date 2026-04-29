output "sql_instance" {
  value = google_sql_database_instance.postgres.name
}

output "sql_ip" {
  value = google_sql_database_instance.postgres.public_ip_address
}