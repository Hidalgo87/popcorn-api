output "vm_name" {
  value = module.compute.vm_name
}

output "vm_ip" {
  value = module.compute.vm_ip
}

output "network_name" {
  value = module.network.network_name
}

output "sql_ip" {
  value = module.database.sql_ip
}

output "secret_name" {
  value = module.secrets.secret_name
}