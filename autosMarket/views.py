from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm
from django.conf import settings # new
from django.http.response import JsonResponse # new
from django.views.decorators.csrf import csrf_exempt # new
from django.contrib.auth import authenticate, login 
from django.contrib import messages



# Create your views here.

#Crea una funcion que retorna la vista de la url que se declara

def home(request):
    return render(request, 'autosMarket/home.html')

    
def albumAutos(request):
    return render(request, 'autosMarket/albumAutos.html')


def autosNuevos(request):
    return render(request, 'autosMarket/autosNuevos.html')

    
def autosUsados(request):
    return render(request, 'autosMarket/autosUsados.html')

    
def contacto(request):
    return render(request, 'autosMarket/contacto.html')

    
def vendeauto(request):
    return render(request, 'autosMarket/vendeauto.html')

    # new
@csrf_exempt
def stripe_config(request):
    if request.method == 'GET':
        stripe_config = {'publicKey': settings.STRIPE_PUBLISHABLE_KEY}
        return JsonResponse(stripe_config, safe=False)


#Se importa el formulario custom creado en forms para poder visualizarlo cargandolo en la variable data 
def registro(request):
    data = {
        'form': CustomUserCreationForm()
    }
    #si el metodo de solicitud html es de tipo POST, se guarda el formulario en la variable del mismo nombre
    #Se valida el formulario se guarda con save  
    if request.method == 'POST':
        formulario = CustomUserCreationForm(data=request.POST)
        if formulario.is_valid():
            formulario.save()
            #autenticar al usuario, crea la variable usuario que obtiene el username y password1
            #Se utiliza el diccionario cleaned_data
            user = authenticate(username=formulario.cleaned_data["username"], password=formulario.cleaned_data["password1"])
            #Se realiza el login del usuario, se utiliza el request ya que el metodo lo utiliza internamente
            login(request, user)
            #Se envia un mensaje de acceso exitoso 
            messages.success(request, "Usuario registrado correctamente")           
            #redirigir al home
            return redirect(to="home")
        #En caso contrario se reescribe el formulario
        data["form"] = formulario


    return render(request, 'registration/registro.html', data)