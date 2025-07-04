# Script PowerShell para crear varios médicos en el backend Django

$medicos = @(
    @{nombre = "Dra. Camila Soto"; especialidad = "Cardiología"; correo = "camila.soto@ejemplo.com"},
    @{nombre = "Dr. Tomás Rivas"; especialidad = "Pediatría"; correo = "tomas.rivas@ejemplo.com"},
    @{nombre = "Dra. Fernanda Ruiz"; especialidad = "Dermatología"; correo = "fernanda.ruiz@ejemplo.com"},
    @{nombre = "Dr. Pablo Herrera"; especialidad = "Traumatología"; correo = "pablo.herrera@ejemplo.com"},
    @{nombre = "Dra. Valentina Pino"; especialidad = "Ginecología"; correo = "valentina.pino@ejemplo.com"}
)

foreach ($medico in $medicos) {
    $json = $medico | ConvertTo-Json
    Invoke-RestMethod -Uri http://localhost:8000/medicos/ -Method POST -Headers @{"Content-Type"="application/json"} -Body $json
}
