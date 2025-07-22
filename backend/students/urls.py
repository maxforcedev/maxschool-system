from django.urls import path
from . import views

urlpatterns = [
    path('students/', views.StudentCreateView.as_view(), name='students-create'),
]
