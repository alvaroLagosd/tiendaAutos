from django.contrib import admin
from .models import Marca, Producto 

# Register your models here.
#otorgar acceso a Las clases marca y producto al dashboard 
admin.site.register(Marca)
admin.site.register(Producto)

