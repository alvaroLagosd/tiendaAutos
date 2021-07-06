from .models import Producto, Marca
from rest_framework import serializers 

#El serializador se encarga de convertir los datos a JSON o realizar el crud desde la Application
#Se agrega una clase productoserializer y hereda desde el modelserializer y dentro de la clase meta se incluyen todos los productos (all)
#En django una url llama a views.py, esta entidad se encargara de llamar a la url template, en este caso el views llamara al serializador   
#Se protege el nombre de la marca, para que quede como solo lectura desde el modelo
#Utilizacion de serializers anidados, Producto/Marca
#Se declara marca dentro de producto, y el atributo que se utiliza como marca_id se obtiene desde la clase marcaserializer 
#variable nombre se utiliza para generar validaciones sobre el atributo nombre, minimo de caracteres y de ingreso obligatorio
#se puede crear un metodo para validar el nombre, el metodo recibe el self que contiene lo que esta en nombre en ese momento
# la variable definida booleana en donde true es si existe en la api el nombre ingresado, se crea una excepcion y se devuelve el mensaje de que ya existe
# en caso contrario el nombre se retorna, se valida que no sea case sensitive con __iexact

class MarcaSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Marca
        fields = '__all__'


class ProductoSerializer(serializers.ModelSerializer):
    nombre_marca = serializers.CharField(read_only=True, source="marca.nombre")
    marca = MarcaSerializer(read_only=True)
    marca_id = serializers.PrimaryKeyRelatedField(queryset=Marca.objects.all(), source="marca")
    nombre = serializers.CharField(required=True, min_length=3, max_length=30)
    
    def validate_nombre(self, value):
        existe = Producto.objects.filter(nombre__iexact=value).exists()

        if existe:
            raise serializers.ValidationError("Este producto ya existe")
        
        return value
  
    class Meta: 
        model = Producto
        fields = '__all__'

 

