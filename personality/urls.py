from django.urls import path

from . import views

app_name = 'personality'

urlpatterns = [
    path('', views.quiz, name='quiz'),
    path('result/', views.result, name='result'),
]
