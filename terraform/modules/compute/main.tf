resource "google_compute_instance" "vm" {
  name         = "${var.environment}-vm"
  machine_type = "e2-micro"
  zone         = var.zone

  tags = ["http-server", "ssh"]

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-12"
    }
  }

  network_interface {
    network    = var.network_name
    subnetwork = var.subnetwork_name

    access_config {
    }
  }

  metadata_startup_script = <<-EOT
    #!/bin/bash
    apt update
    apt install -y docker.io
    systemctl enable docker
    systemctl start docker
  EOT
}