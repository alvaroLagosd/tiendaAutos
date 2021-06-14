from django.urls import path
from .views import home, albumAutos, autosNuevos, autosUsados, contacto, vendeauto
#importa la vista desde template el home

urlpatterns = [
    path('', home, name="home"),
    path('albumAutos/', albumAutos, name="albumAutos"),
    path('autosNuevos/', autosNuevos, name="autosNuevos"),
    path('autosUsados/', autosUsados, name="autosUsados"),
    path('contacto/', contacto, name="contacto"),
    path('vendeauto/', vendeauto, name="vendeauto"),
]
