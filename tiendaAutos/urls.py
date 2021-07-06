"""tiendaAutos URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
#cargar settings con las variables, la url debe apuntar al directorio fisico 
from django.conf import settings 
#cargar los archivos en static 
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    # se incluye las rutas que estan en el urls de la pagina principal
    path('', include('autosMarket.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('social-auth/', include('social_django.urls', namespace="social")),
]

#si la variable debug esta en true, la aplicacion no esta en produccion no en produccion
#url patterns enlaza la url /media/, almacenada en la variable media_url, que apunta hacia las imagenes, con el directorio raiz del proyecto declarado 
#en la variable media_root   
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)