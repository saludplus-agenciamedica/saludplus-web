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

from datetime import datetime, timedelta, time

class Cita(models.Model):
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE, related_name='citas')
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='citas')
    fecha = models.DateField()
    hora = models.TimeField()

    motivo = models.TextField(blank=True)
    creada = models.DateTimeField(auto_now_add=True)

    ESTADO_NUEVA = 'nueva'
    ESTADO_PENDIENTE = 'pendiente'
    ESTADO_COMPLETADA = 'completada'
    ESTADO_CANCELADA = 'cancelada'
    ESTADOS = [
        (ESTADO_NUEVA, 'Nueva'),
        (ESTADO_PENDIENTE, 'Pendiente'),
        (ESTADO_COMPLETADA, 'Completada'),
        (ESTADO_CANCELADA, 'Cancelada'),
    ]
    estado = models.CharField(max_length=15, choices=ESTADOS, default=ESTADO_NUEVA)

    def __str__(self):
        return f"Cita de {self.paciente.nombre} con {self.medico.nombre} el {self.fecha} a las {self.hora}"

    def clean(self):
        from django.core.exceptions import ValidationError
        # No permitir fechas pasadas
        cita_datetime = datetime.combine(self.fecha, self.hora)
        if cita_datetime < datetime.now():
            raise ValidationError("No se puede agendar una cita en el pasado.")
        # No permitir citas fuera de horario laboral (8:00 a 20:00)
        if not (time(8, 0) <= self.hora <= time(20, 0)):
            raise ValidationError("La cita debe estar entre las 08:00 y las 20:00 horas.")
        # Restricción: solo se puede marcar como completada si la fecha/hora ya pasó
        if self.estado == self.ESTADO_COMPLETADA:
            if cita_datetime > datetime.now():
                raise ValidationError("No se puede marcar como completada una cita futura.")
        # Restricción: no se puede volver a 'nueva' desde otro estado
        if self.pk and self.estado == self.ESTADO_NUEVA:
            from django.db import transaction
            old = type(self).objects.get(pk=self.pk)
            if old.estado != self.ESTADO_NUEVA:
                raise ValidationError("No se puede volver al estado 'nueva' una vez cambiado.")
    def marcar_completada(self):
        """Marca la cita como completada si corresponde."""
        cita_datetime = datetime.combine(self.fecha, self.hora)
        if cita_datetime > datetime.now():
            raise ValueError("No se puede completar una cita futura.")
        self.estado = self.ESTADO_COMPLETADA
        self.save()

    def marcar_cancelada(self):
        """Marca la cita como cancelada."""
        self.estado = self.ESTADO_CANCELADA
        self.save()

    def tiempo_restante(self):
        """Devuelve el tiempo restante para la cita como timedelta. Si ya pasó, devuelve timedelta(0)."""
        now = datetime.now()
        cita_datetime = datetime.combine(self.fecha, self.hora)
        restante = cita_datetime - now
        return restante if restante > timedelta(0) else timedelta(0)

    @classmethod
    def promedio_tiempo_resolucion(cls):
        """Ejemplo: calcula el promedio de tiempo entre la creación y la fecha/hora de la cita."""
        citas = cls.objects.all()
        if not citas:
            return timedelta(0)
        total = sum([(datetime.combine(c.fecha, c.hora) - c.creada) for c in citas], timedelta(0))
        return total / citas.count()
