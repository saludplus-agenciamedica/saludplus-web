# Este script activa el entorno virtual, instala Django y crea el proyecto base
python -m venv venv
Write-Host "Entorno virtual creado."

# Activar entorno virtual
.\venv\Scripts\Activate
Write-Host "Entorno virtual activado."

# Instalar dependencias
pip install -r requirements.txt
Write-Host "Dependencias instaladas."

# Crear proyecto Django solo si no existe
if (!(Test-Path "manage.py")) {
    django-admin startproject backend_project .
    Write-Host "Proyecto Django creado."
} else {
    Write-Host "El proyecto Django ya existe."
}

# Mostrar versiones para verificación
python --version
pip --version
pip show django
