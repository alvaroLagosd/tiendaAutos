from django.urls import path
from .views import home
#importa la vista desde template el home

urlpatterns = [
    path('', home, name="home"),
]
