# 🍿 Popcorn API v2.0

Arquitecura:
<img width="1162" height="721" alt="WhatsApp Image 2026-04-15 at 5 41 06 PM" src="https://github.com/user-attachments/assets/ed18481b-b24f-4184-92cf-f04a44527674" />


API RESTful para gestión de películas, construida con **NestJS**, **Prisma ORM**, **PostgreSQL** y **Docker**.
Ahora incluye **observabilidad en tiempo real con Grafana Cloud**, integración entre APIs y procesamiento asíncrono de eventos.

---

## 🚀 Demo en vivo

| Ambiente      | URL                                  |
| ------------- | ------------------------------------ |
| 🧪 Pruebas    | https://popcorn-api-dev.onrender.com |
| 🚀 Producción | http://34.45.249.45:3000             |

📝 Agrega `/api` para probar los endpoints.
📝 Agrega `/api` para Swagger (documentación interactiva).
📝 Endpoint de métricas: `/metrics`

---

## 📋 Descripción

Esta API implementa un sistema completo para la gestión de películas, con soporte para:

* CRUD completo de entidades
* Integración con APIs externas
* Procesamiento asíncrono de datos
* Observabilidad con métricas en tiempo real

El objetivo del proyecto es aplicar:

* Arquitectura backend escalable
* Testing automatizado
* Integración continua (CI)
* Despliegue continuo (CD)
* Contenerización con Docker
* Monitoreo y observabilidad

---

## 🆕 Novedades v2.0

### 🔗 Integración entre APIs

* Al crear un **Director**, se realiza un `POST` a una API externa.
* Se construye un JSON enriquecido antes de enviarlo.

---

### ⏳ Procesamiento asíncrono

Flujo implementado:

1. Se recibe un `POST` para crear un Director
2. Se guarda en base de datos
3. Se aplica un delay (~20 segundos)
4. Durante ese tiempo, el recurso puede ser modificado externamente
5. Se consulta nuevamente el estado actualizado
6. Se envía a una API externa

👉 Esto permite demostrar **modificaciones en tiempo real durante el procesamiento**

---

### 📊 Observabilidad (Grafana Cloud)

Se integró monitoreo usando:

* Grafana Agent
* Prometheus (remote_write)
* Métricas personalizadas

#### Métricas disponibles:

* `http_requests_total`
* Requests por método, ruta y status
* Scraping desde `/metrics`

---

### 🐳 Docker + Monitoring Stack

Nuevo servicio:

* `grafana-agent` para recolectar métricas
* Configuración con variables de entorno (`.env`)
* Integración con Grafana Cloud

---

## 🎬 Entidades

| Entidad  | Descripción           |
| -------- | --------------------- |
| Movie    | Películas registradas |
| Director | Directores asociados  |
| Review   | Reseñas de películas  |

---

## 🛠️ Tech Stack

| Tecnología     | Uso               |
| -------------- | ----------------- |
| NestJS         | Framework backend |
| Prisma ORM     | ORM               |
| PostgreSQL     | Base de datos     |
| Docker         | Contenedores      |
| GitHub Actions | CI/CD             |
| Render / GCP   | Hosting           |
| Jest           | Testing           |
| Swagger        | Documentación     |
| Grafana Cloud  | Observabilidad    |
| Prometheus     | Métricas          |

---

## 📡 Endpoint de Métricas

```bash
GET /metrics
```

Ejemplo de uso con curl:

```bash
curl http://localhost:3000/metrics
```

---

## 🔄 Ejemplo de flujo distribuido

```text
Client → API 1 → DB
             ↓ (delay 20s)
        Usuario externo modifica recurso
             ↓
        API 1 consulta estado actualizado
             ↓
        API 1 → API 2 (POST)
```

---

## 🧪 Testing

Se implementan pruebas unitarias con Jest:

* Mock de Prisma
* Mock de servicios externos
* Validación de lógica de negocio

```bash
npm run test
```

---

## ⚙️ CI/CD

Pipeline con GitHub Actions:

* Instalación de dependencias
* Ejecución de tests
* Validación de cobertura
* Deploy automático

---

## 🔐 Variables de entorno

Ejemplo `.env`:

```env
DATABASE_URL=postgresql://...
GRAFANA_API_KEY=your_api_key
```

---

## 📦 Cómo correr el proyecto

### Local

```bash
npm install
npm run start:dev
```

---

### Con Docker

```bash
docker compose up --build
```

---

## 📈 Observabilidad en tiempo real

Puedes generar tráfico así:

```bash
for /L %i in (1,1,100) do curl http://localhost:3000/api/v2/directors
```

Y ver los resultados en Grafana Cloud.

---

## 👨‍💻 Autor

Proyecto académico - DevOps & Backend Engineering


