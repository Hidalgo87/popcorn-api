module "network" {
  source      = "./modules/network"
  project_id  = var.project_id
  region      = var.region
  environment = var.environment
}

module "compute" {
  source          = "./modules/compute"
  project_id      = var.project_id
  zone            = var.zone
  environment     = var.environment
  network_name    = module.network.network_name
  subnetwork_name = module.network.subnet_name
}

module "database" {
  source      = "./modules/database"
  project_id  = var.project_id
  region      = var.region
  environment = var.environment
  db_password = var.db_password
}

module "secrets" {
  source      = "./modules/secrets"
  project_id  = var.project_id
  environment = var.environment
  db_password = var.db_password
}