from django.urls import path
from . import views

urlpatterns = [
    path('medicos/', views.medico_list_create, name='medico_list_create'),
    path('medicos/<int:pk>/', views.medico_detail, name='medico_detail'),
    path('pacientes/', views.paciente_list_create, name='paciente_list_create'),
    path('pacientes/<int:pk>/', views.paciente_detail, name='paciente_detail'),
    path('citas/', views.cita_list_create, name='cita_list_create'),
    path('citas/<int:pk>/', views.cita_detail, name='cita_detail'),
    # Nuevas rutas para filtros y búsquedas
    path('citas/filtrar/', views.cita_filtrar, name='cita_filtrar'),
]
