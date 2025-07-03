
from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from .models import Medico, Paciente, Cita
from django.core.exceptions import ValidationError
from django.forms.models import model_to_dict

# Utilidad para parsear JSON
def parse_json(request):
    try:
        return json.loads(request.body.decode('utf-8'))
    except Exception:
        return {}

# CRUD para Medico
@csrf_exempt
@require_http_methods(["GET", "POST"])
def medico_list_create(request):
    if request.method == "GET":
        medicos = list(Medico.objects.all().values())
        return JsonResponse(medicos, safe=False)
    elif request.method == "POST":
        data = parse_json(request)
        medico = Medico(**data)
        try:
            medico.full_clean()
            medico.save()
            return JsonResponse(model_to_dict(medico), status=201)
        except ValidationError as e:
            return JsonResponse({'errors': e.message_dict}, status=400)

@csrf_exempt
@require_http_methods(["GET", "PUT", "DELETE"])
def medico_detail(request, pk):
    medico = get_object_or_404(Medico, pk=pk)
    if request.method == "GET":
        return JsonResponse(model_to_dict(medico))
    elif request.method == "PUT":
        data = parse_json(request)
        for field, value in data.items():
            setattr(medico, field, value)
        try:
            medico.full_clean()
            medico.save()
            return JsonResponse(model_to_dict(medico))
        except ValidationError as e:
            return JsonResponse({'errors': e.message_dict}, status=400)
    elif request.method == "DELETE":
        medico.delete()
        return JsonResponse({'deleted': True})

# CRUD para Paciente
@csrf_exempt
@require_http_methods(["GET", "POST"])
def paciente_list_create(request):
    if request.method == "GET":
        pacientes = list(Paciente.objects.all().values())
        return JsonResponse(pacientes, safe=False)
    elif request.method == "POST":
        data = parse_json(request)
        paciente = Paciente(**data)
        try:
            paciente.full_clean()
            paciente.save()
            return JsonResponse(model_to_dict(paciente), status=201)
        except ValidationError as e:
            return JsonResponse({'errors': e.message_dict}, status=400)

@csrf_exempt
@require_http_methods(["GET", "PUT", "DELETE"])
def paciente_detail(request, pk):
    paciente = get_object_or_404(Paciente, pk=pk)
    if request.method == "GET":
        return JsonResponse(model_to_dict(paciente))
    elif request.method == "PUT":
        data = parse_json(request)
        for field, value in data.items():
            setattr(paciente, field, value)
        try:
            paciente.full_clean()
            paciente.save()
            return JsonResponse(model_to_dict(paciente))
        except ValidationError as e:
            return JsonResponse({'errors': e.message_dict}, status=400)
    elif request.method == "DELETE":
        paciente.delete()
        return JsonResponse({'deleted': True})


# CRUD para Cita
@csrf_exempt
@require_http_methods(["GET", "POST"])
def cita_list_create(request):
    if request.method == "GET":
        citas = list(Cita.objects.all().values())
        return JsonResponse(citas, safe=False)
    elif request.method == "POST":
        data = parse_json(request)
        try:
            medico = Medico.objects.get(pk=data['medico'])
            paciente = Paciente.objects.get(pk=data['paciente'])
            cita = Cita(
                medico=medico,
                paciente=paciente,
                fecha=data['fecha'],
                hora=data['hora'],
                motivo=data.get('motivo', ''),
                estado=data.get('estado', Cita.ESTADO_NUEVA)
            )
            cita.full_clean()
            cita.save()
            return JsonResponse(model_to_dict(cita), status=201)
        except (ValidationError, KeyError, Medico.DoesNotExist, Paciente.DoesNotExist) as e:
            return JsonResponse({'errors': str(e)}, status=400)

# Consulta avanzada: filtrar/buscar citas por estado, fechas, prioridad, etc.
@csrf_exempt
@require_http_methods(["GET"])
def cita_filtrar(request):
    """
    Permite filtrar citas por estado, fecha inicial/final, medico, paciente.
    Ejemplo de uso:
    /citas/filtrar/?estado=pendiente&fecha_inicio=2025-07-01&fecha_fin=2025-07-31&medico=1
    """
    qs = Cita.objects.all()
    estado = request.GET.get('estado')
    if estado:
        qs = qs.filter(estado=estado)
    fecha_inicio = request.GET.get('fecha_inicio')
    if fecha_inicio:
        qs = qs.filter(fecha__gte=fecha_inicio)
    fecha_fin = request.GET.get('fecha_fin')
    if fecha_fin:
        qs = qs.filter(fecha__lte=fecha_fin)
    medico = request.GET.get('medico')
    if medico:
        qs = qs.filter(medico_id=medico)
    paciente = request.GET.get('paciente')
    if paciente:
        qs = qs.filter(paciente_id=paciente)
    # Se puede agregar más filtros según necesidades (por ejemplo, por hora, por motivo, etc.)
    citas = list(qs.values())
    return JsonResponse(citas, safe=False)

@csrf_exempt
@require_http_methods(["GET", "PUT", "DELETE"])
def cita_detail(request, pk):
    cita = get_object_or_404(Cita, pk=pk)
    if request.method == "GET":
        return JsonResponse(model_to_dict(cita))
    elif request.method == "PUT":
        data = parse_json(request)
        for field, value in data.items():
            if field in ['medico', 'paciente']:
                if field == 'medico':
                    value = Medico.objects.get(pk=value)
                else:
                    value = Paciente.objects.get(pk=value)
            setattr(cita, field, value)
        try:
            cita.full_clean()
            cita.save()
            return JsonResponse(model_to_dict(cita))
        except (ValidationError, Medico.DoesNotExist, Paciente.DoesNotExist) as e:
            return JsonResponse({'errors': str(e)}, status=400)
    elif request.method == "DELETE":
        cita.delete()
        return JsonResponse({'deleted': True})
