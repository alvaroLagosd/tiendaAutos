from django.db import models

# Create your models here.


class Marca(models.Model):
    nombre = models.CharField(max_length=50)
    #funcion que devuelve el campo nombre como string     
    def __str__(self):
        return self.nombre

class Producto(models.Model):
    nombre = models.CharField(max_length=50)
    precio = models.IntegerField()
    descripcion = models.TextField() 
    nuevo = models.BooleanField()
    # clave foranea de la clase marca, en el caso que se elimine una marca los productos no quedaran sin marca 
    marca = models.ForeignKey(Marca, on_delete=models.PROTECT)
    fecha_fabricacion = models.DateField()
    #variable imagen, donde se cargara una foto del producto ingresada desde el admin de django
    #upload_to asigna una carpeta donde se subira el archivo de imagen dentro del directorio media, sera nulo por defecto
    imagen = models.ImageField(upload_to="productos", null=True)
    def __str__(self):
        return self.nombre
