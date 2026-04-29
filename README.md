# 🍿 Popcorn API

API RESTful para gestión de películas, construida con **NestJS**, **Prisma ORM**, **PostgreSQL** y **Docker**.  
Incluye pipelines de **CI/CD con GitHub Actions**, validación de cobertura y despliegue automático a ambientes de pruebas y producción.

---

## 🚀 Demo en vivo

| Ambiente | URL |
|-----------|------|
| 🧪 Pruebas | https://popcorn-api-dev.onrender.com |
| 🚀 Producción | https://popcorn-api-3olh.onrender.com |

📝 Agrega `/api` para probar los endpoints.  
📝 Agrega `/api-docs` para ver la documentación interactiva (Swagger).

---

## 📋 Descripción

Este proyecto implementa una API RESTful con CRUD completo para entidades relacionadas con el mundo del cine.

El objetivo del proyecto es aplicar:

- Buenas prácticas de arquitectura backend
- Testing automatizado
- Integración continua (CI)
- Despliegue continuo (CD)
- Contenerización con Docker
- Separación de ambientes (test / producción)
- Infraestructura como código (IaC) con Terraform

---

## 🎬 Entidades

| Entidad | Descripción |
|----------|-------------|
| Movie | Películas registradas en la plataforma |
| Director | Directores asociados a películas |
| Review | Reseña asociada a una película |

---

## 🛠️ Tech Stack

| Tecnología | Uso |
|------------|------|
| NestJS | Framework backend |
| Prisma ORM | Acceso y modelado de base de datos |
| PostgreSQL | Base de datos relacional |
| Docker | Contenedores |
| GitHub Actions | CI/CD |
| Render | Hosting |
| Terraform | Infraestructura como código |
| Google Cloud Platform | Servicios cloud |
| Jest | Testing |
| Swagger | Documentación interactiva |

---

# ☁️ Infraestructura en Google Cloud con Terraform

Para la entrega de DevOps se implementó aprovisionamiento automático usando **Terraform** sobre **Google Cloud Platform**.

## ✅ Servicios creados

| Servicio | Descripción |
|----------|-------------|
| Compute Engine | Máquina virtual Linux para acceso SSH y despliegue |
| VPC Network | Red privada personalizada |
| Cloud SQL | Base de datos PostgreSQL administrada |
| Secret Manager | Gestión segura de credenciales |

---

# 📁 Estructura Terraform

```text
terraform/
│── main.tf
│── provider.tf
│── variables.tf
│── outputs.tf
│
├── modules/
│   ├── network/
│   ├── compute/
│   ├── database/
│   └── secrets/
│
└── environments/
    └── dev/
        └── terraform.tfvars
````

---

# ⚙️ Cómo desplegar la infraestructura

## 1️⃣ Requisitos previos

Instalar:

* Terraform
* Google Cloud CLI
* Cuenta en Google Cloud con billing activo

---

## 2️⃣ Autenticación en Google Cloud

```bash
gcloud auth login
gcloud auth application-default login
gcloud config set project TU_PROJECT_ID
```

---

## 3️⃣ Inicializar Terraform

Ubicarse dentro de la carpeta:

```bash
cd terraform
```

Luego ejecutar:

```bash
terraform init
```

---

## 4️⃣ Ver plan de ejecución

```bash
terraform plan -var-file="environments/dev/terraform.tfvars"
```

---

## 5️⃣ Crear infraestructura

```bash
terraform apply -var-file="environments/dev/terraform.tfvars"
```

Terraform aprovisionará automáticamente:

* VM pública
* Red privada
* Firewall rules
* PostgreSQL Cloud SQL
* Secret Manager

---

## 6️⃣ Eliminar infraestructura

```bash
terraform destroy -var-file="environments/dev/terraform.tfvars"
```

Esto elimina todos los recursos creados y evita costos innecesarios.

---

# 🔐 Prueba de conexión por SSH

Una vez creada la VM:

```bash
gcloud compute ssh dev-vm --zone=us-central1-a
```

Esto abre una terminal remota Linux en Google Cloud.

---

# 🗄️ Prueba de Base de Datos por SSH

Desde la VM remota se ejecutan scripts SQL contra Cloud SQL PostgreSQL.

## Script 1: Crear tablas

```bash
psql -h CLOUD_SQL_IP -U popcorn_user -d popcorndb -f scripts/db/1create.sql
```

## Script 2: Insertar datos y consultar

```bash
psql -h CLOUD_SQL_IP -U popcorn_user -d popcorndb -f scripts/db/2seed.sql
```

## Script 3: Eliminar tablas

```bash
psql -h CLOUD_SQL_IP -U popcorn_user -d popcorndb -f scripts/db/3drop.sql
```

---

# 🧠 Integración con Prisma ORM

La API usa Prisma ORM conectado a Cloud SQL mediante:

```env
DATABASE_URL="postgresql://usuario:password@host:5432/popcorndb"
```

Comandos útiles:

```bash
npx prisma migrate deploy
npx prisma db seed
```

---

# 🔄 Flujo DevOps Implementado

```text
Terraform
   ↓
Google Cloud Resources
   ↓
VM + PostgreSQL + Secrets
   ↓
SSH Administration
   ↓
NestJS + Prisma API
```

---

# 👨‍💻 Autor

Juan Fernando Álvarez


