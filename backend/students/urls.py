from rest_framework.routers import DefaultRouter
#  from django.urls import path
from . import views

router = DefaultRouter()
router.register('students', views.StudentViewSet, basename='students')

urlpatterns = []
urlpatterns += router.urls
