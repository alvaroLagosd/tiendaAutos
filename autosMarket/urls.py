from django.urls import path, include
from .views import home, albumAutos, autosNuevos, autosUsados, contacto,\
     vendeauto, registro, ProductoViewset
#importa la vista desde template el home
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('producto', ProductoViewset)


urlpatterns = [
    path('', home, name="home"),
    path('albumAutos/', albumAutos, name="albumAutos"),
    path('autosNuevos/', autosNuevos, name="autosNuevos"),
    path('autosUsados/', autosUsados, name="autosUsados"),
    path('contacto/', contacto, name="contacto"),
    path('vendeauto/', vendeauto, name="vendeauto"),
    path('config/', views.stripe_config),
    path('registro/', registro, name="registro"),  # new
    path('api/', include(router.urls))
]
