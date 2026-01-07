from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('experience/<int:pk>/', views.experience_detail, name='experience_detail'),
    path('all-experience/', views.all_experience, name='all_experience'), 
    path('project/<int:pk>/', views.project_detail, name='project_detail'),
    path('all-projects/', views.all_projects, name='all_projects'),
]