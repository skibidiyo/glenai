from django.urls import re_path

from . import views

app_name = 'personality-mobile'

urlpatterns = [
    re_path(r'^personality-mobile/?$', views.quiz, {'mobile': True}, name='quiz'),
    re_path(r'^personality-mobile/result/?$', views.result, {'mobile': True}, name='result'),
]
