# Solemne2TecsWeb

Este proyecto es una aplicación Angular para la gestión de citas médicas.

---

## Ejecución local (desarrollo)

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo:

   ```bash
   ng serve
   ```

3. Abre tu navegador en [http://localhost:4200](http://localhost:4200)

---

## Build de producción

1. Genera el build optimizado:

   ```bash
   ng build --configuration production
   ```

   Los archivos generados estarán en `dist/saludplus/browser/`.

---

## Ejecución con Docker

1. Asegúrate de haber generado el build de producción:

   ```bash
   ng build --configuration production
   ```

2. Construye la imagen Docker:

   ```powershell
   docker build -t saludplus-web .
   ```

3. Ejecuta el contenedor:

   ```powershell
   docker run -p 80:80 saludplus-web
   ```

4. Accede a la app en [http://localhost](http://localhost)

---

## Pruebas unitarias

Ejecuta los tests con:

```bash
ng test
```

---

## Notas

- Requiere Node.js y Angular CLI instalados para desarrollo local.
- Docker solo sirve archivos estáticos, no incluye backend.
- Si tienes problemas con dependencias, ejecuta `npm install` nuevamente.

---

## Recursos adicionales

- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
