# Script PowerShell para crear médicos en el backend Django

$medicos = @(
    @{nombre = "Dra. Camila Soto"; especialidad = "Cardiología"; correo = "camila.soto@ejemplo.com"},
    @{nombre = "Dr. Tomás Rivas"; especialidad = "Pediatría"; correo = "tomas.rivas@ejemplo.com"}
)

foreach ($medico in $medicos) {
    $json = $medico | ConvertTo-Json
    Invoke-RestMethod -Uri http://localhost:8000/medicos/ -Method POST -Headers @{"Content-Type"="application/json"} -Body $json
}
