from django.db import models

class Medico(models.Model):
    nombre = models.CharField(max_length=100)
    especialidad = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"{self.nombre} ({self.especialidad})"

class Paciente(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.nombre

class Cita(models.Model):
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE, related_name='citas')
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='citas')
    fecha = models.DateField()
    hora = models.TimeField()
    motivo = models.TextField(blank=True)
    creada = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cita de {self.paciente.nombre} con {self.medico.nombre} el {self.fecha} a las {self.hora}"
