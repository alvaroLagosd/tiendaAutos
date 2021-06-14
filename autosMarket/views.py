from django.shortcuts import render

# Create your views here.

#Conectan el modelo con el programa de

def home(request):
    return render(request, 'autosMarket/home.html')