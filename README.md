# SaludPlus - Sistema de Gestión de Citas Médicas

Este proyecto es una aplicación web de gestión de citas médicas, compuesta por un backend en Django y un frontend en Angular.

## Requisitos previos

- Python 3.10+ (recomendado Anaconda o venv)
- Node.js 18+ y npm
- Angular CLI (`npm install -g @angular/cli`)
- (Opcional) Docker

## Estructura del proyecto

```
saludplus-web-1/
├── backend/      # Backend Django
├── frontend/     # Frontend Angular
└── README.md     # Este archivo
```

---

## 1. Configuración y ejecución del backend (Django)

### a) Instalar dependencias

1. Abre una terminal y navega a la carpeta `backend`:
   ```powershell
   cd backend
   ```
2. (Opcional) Crea y activa un entorno virtual:
   ```powershell
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Instala las dependencias:
   ```powershell
   pip install -r requirements.txt
   ```

### b) Migrar la base de datos

```powershell
python manage.py makemigrations
python manage.py migrate
```

### c) Crear un superusuario (opcional, para admin)

```powershell
python manage.py createsuperuser
```

### d) Cargar médicos de ejemplo (opcional)

```powershell
powershell -ExecutionPolicy Bypass -File crear_medicos.ps1
```

### e) Ejecutar el servidor de desarrollo

```powershell
python manage.py runserver
```

El backend estará disponible en: http://localhost:8000/

---

## 2. Configuración y ejecución del frontend (Angular)

1. Abre una nueva terminal y navega a la carpeta `frontend`:
   ```powershell
   cd frontend
   ```
2. Instala las dependencias:
   ```powershell
   npm install
   ```
3. Ejecuta la aplicación Angular:
   ```powershell
   ng serve
   ```

El frontend estará disponible en: http://localhost:4200/

---

## 3. Uso básico

- Accede a http://localhost:4200/ para usar la aplicación.
- El backend expone las siguientes rutas principales:
  - `/medicos/` CRUD de médicos
  - `/pacientes/` CRUD de pacientes
  - `/citas/` CRUD de citas
  - `/citas/filtrar/` Filtros avanzados de citas

## 4. Notas importantes

- El backend permite crear un paciente "al vuelo" al registrar una cita si el nombre no existe.
- Si usas Docker, puedes crear tus propios Dockerfile y docker-compose para ambos servicios.
- Si tienes problemas con CORS, asegúrate de que el backend esté corriendo y que la configuración de CORS en Django permita el origen del frontend.

## 5. Scripts útiles

- `backend/crear_medicos.ps1`: Crea médicos de ejemplo en la base de datos.
- `backend/setup_backend.ps1`: Instala dependencias y prepara el entorno backend.

---
