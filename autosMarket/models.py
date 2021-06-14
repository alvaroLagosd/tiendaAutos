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
    def __str__(self):
        return self.nombre
