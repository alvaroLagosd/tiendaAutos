from django import forms
from .models import Producto
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


#Se crea una clase custom para heredar la clase usercreationform preexistente y poder agregar validaciones a la clase nueva 
class CustomUserCreationForm(UserCreationForm):
    
    #META es la clase de los formularios
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', "email", "password1", "password2" ]

    