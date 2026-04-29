resource "google_sql_database_instance" "postgres" {
  name             = "${var.environment}-postgres"
  region           = var.region
  database_version = "POSTGRES_15"

  settings {
    tier = "db-f1-micro"

    ip_configuration {
      ipv4_enabled = true
      authorized_networks {
        name  = "all"
        value = "0.0.0.0/0"
      }
    }
  }

  deletion_protection = false
}

resource "google_sql_database" "db" {
  name     = "popcorndb"
  instance = google_sql_database_instance.postgres.name
}

resource "google_sql_user" "user" {
  name     = "popcorn_user"
  instance = google_sql_database_instance.postgres.name
  password = var.db_password
}