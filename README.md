# 🍿 Popcorn API

API RESTful para gestión de películas, construida con **NestJS**, **Prisma ORM**, **PostgreSQL** y **Docker**.  
Incluye pipelines de **CI/CD con GitHub Actions**, validación de cobertura y despliegue automático a ambientes de pruebas y producción.

---

## 🚀 Demo en vivo

| Ambiente      | URL                                   |
| ------------- | ------------------------------------- |
| 🧪 Pruebas    | https://popcorn-api-dev.onrender.com  |
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

# 🚀 Despliegue Canary con Kubernetes (GKE)

Como parte de la estrategia de despliegue progresivo, se implementó un esquema **Canary Release** sobre **Google Kubernetes Engine (GKE)**.

## 🎯 Objetivo

Permitir la validación de una nueva versión de la API en producción sin afectar completamente a los usuarios finales.

La estrategia consiste en ejecutar simultáneamente dos versiones de la aplicación:

- **Stable**: versión estable actualmente validada.
- **Canary**: nueva versión candidata con cambios visibles.

---

## 🏗️ Arquitectura Implementada

```text
                    LoadBalancer Service
                             │
                             ▼
                   deployment-stable-service
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼

     Deployment Stable                Deployment Canary
       Version 3.0.0                    Version 4.0.0
           1 Pod                            1 Pod
```

La distribución del tráfico es realizada automáticamente por Kubernetes mediante un único Service que balancea las solicitudes entre ambos Deployments.

---

## 📦 Componentes

### Deployment Stable

Responsable de ejecutar la versión estable de la API.

Características:

- Release: `stable`
- Version: `3.0.0`
- Réplicas: `1`

Health Check:

```json
{
  "status": "UP",
  "release": "stable",
  "version": "3.0.0",
  "deploymentDate": "2026-06-03T04:20:00Z"
}
```

---

### Deployment Canary

Responsable de ejecutar la nueva versión candidata.

Características:

- Release: `canary`
- Version: `4.0.0`
- Réplicas: `1`

Health Check:

```json
{
  "status": "UP",
  "release": "canary",
  "version": "4.0.0",
  "deploymentDate": "2026-06-03T05:30:00Z"
}
```

---

## ⚙️ Recursos Kubernetes

Se implementaron los siguientes manifiestos:

```text
k8s/
├── stable-deployment.yaml
├── canary-deployment.yaml
└── service.yaml
```

### Stable Deployment

Define la versión estable de la aplicación.

### Canary Deployment

Define la versión candidata con los cambios funcionales.

### Service

Expone ambos Deployments mediante un único LoadBalancer.

```yaml
selector:
  app: popcorn-api
```

De esta forma Kubernetes distribuye el tráfico entre todos los Pods disponibles que posean dicho label.

---

## 🌐 Endpoint Público

```text
http://34.31.119.64
```

Health Check:

```text
GET /api/health
```

Ejemplo:

```bash
curl http://34.31.119.64/api/health
```

---

## 🔍 Validación del Canary

Al ejecutar múltiples solicitudes al endpoint de Health Check, Kubernetes puede responder desde cualquiera de los Deployments disponibles.

Ejemplos:

```json
{
  "status": "UP",
  "release": "stable",
  "version": "3.0.0"
}
```

```json
{
  "status": "UP",
  "release": "canary",
  "version": "4.0.0"
}
```

Esto permite verificar que ambas versiones están recibiendo tráfico.

---

## 🛡️ Tolerancia a Fallos

La estrategia implementada aprovecha el mecanismo de Service Discovery de Kubernetes.

Si el Deployment Canary falla o deja de estar disponible:

```text
deployment-canary → DOWN
```

Kubernetes elimina automáticamente sus Pods de los endpoints activos del Service.

Resultado:

```text
100% del tráfico → Stable
```

Sin intervención manual ni indisponibilidad del servicio.

---

## 📊 Monitoreo

Los Deployments y Pods pueden monitorearse mediante:

```bash
kubectl get deployments
kubectl get pods
kubectl get svc
kubectl get endpoints
```

También pueden visualizarse desde la consola de Google Kubernetes Engine.

---

## 🔄 Flujo DevOps Actual

```text
GitHub
   ↓
Cloud Build
   ↓
Artifact Registry
   ↓
Google Kubernetes Engine
   ↓
Stable + Canary Deployments
   ↓
LoadBalancer Service
   ↓
Usuarios
```

---

## 🚀 Beneficios Obtenidos

- Validación progresiva de nuevas versiones.
- Reducción del riesgo en producción.
- Rollback inmediato ante fallos.
- Alta disponibilidad.
- Balanceo automático de tráfico.
- Integración con Cloud Build y Artifact Registry.
- Infraestructura declarativa mediante Kubernetes.

```

```

---

## 🎬 Entidades

| Entidad  | Descripción                            |
| -------- | -------------------------------------- |
| Movie    | Películas registradas en la plataforma |
| Director | Directores asociados a películas       |
| Review   | Reseña asociada a una película         |

---

## 🛠️ Tech Stack

| Tecnología            | Uso                                |
| --------------------- | ---------------------------------- |
| NestJS                | Framework backend                  |
| Prisma ORM            | Acceso y modelado de base de datos |
| PostgreSQL            | Base de datos relacional           |
| Docker                | Contenedores                       |
| GitHub Actions        | CI/CD                              |
| Render                | Hosting                            |
| Terraform             | Infraestructura como código        |
| Google Cloud Platform | Servicios cloud                    |
| Jest                  | Testing                            |
| Swagger               | Documentación interactiva          |

---

# ☁️ Infraestructura en Google Cloud con Terraform

Para la entrega de DevOps se implementó aprovisionamiento automático usando **Terraform** sobre **Google Cloud Platform**.

## ✅ Servicios creados

| Servicio       | Descripción                                        |
| -------------- | -------------------------------------------------- |
| Compute Engine | Máquina virtual Linux para acceso SSH y despliegue |
| VPC Network    | Red privada personalizada                          |
| Cloud SQL      | Base de datos PostgreSQL administrada              |
| Secret Manager | Gestión segura de credenciales                     |

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
```

---

# ⚙️ Cómo desplegar la infraestructura

## 1️⃣ Requisitos previos

Instalar:

- Terraform
- Google Cloud CLI
- Cuenta en Google Cloud con billing activo

---

## 2️⃣ Autenticación en Google Cloud

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
terraform plan -var-file="environments/dev/terraform.tfvars"
```

---

## 5️⃣ Crear infraestructura

```bash
terraform apply -var-file="environments/dev/terraform.tfvars"
```

Terraform aprovisionará automáticamente:

- VM pública
- Red privada
- Firewall rules
- PostgreSQL Cloud SQL
- Secret Manager

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
