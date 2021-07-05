from .models import Producto
from rest_framework import serializers 

#El serializador se encarga de convertir los datos a JSON o realizar el crud desde la Application
#Se agrega una clase productoserializer y hereda desde el modelserializer y dentro de la clase meta se incluyen todos los productos (all)
#En django una url llama a views.py, esta entidad se encargara de llamar a la url template, en este caso el views llamara al serializador   
#Se protege el nombre de la marca, para que quede como solo lectura desde el modelo

class ProductoSerializer(serializers.ModelSerializer):
    nombre_marca = serializers.CharField(read_only=True, source="marca.nombre")
    class Meta: 
        model = Producto
        fields = '__all__'

 

