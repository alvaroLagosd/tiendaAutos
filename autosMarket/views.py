from django.shortcuts import render

from django.conf import settings # new
from django.http.response import JsonResponse # new
from django.views.decorators.csrf import csrf_exempt # new



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