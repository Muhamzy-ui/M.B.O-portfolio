# views.py
from django.shortcuts import render
from .models import Skill, Experience, Project
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
# from .models import Project

def experience_detail(request, pk):
    # Fetch the specific job or return a 404 error if not found
    experience = get_object_or_404(Experience, pk=pk)
    return render(request, 'portfolio/experience_detail.html', {'experience': experience})

def index(request):
    skills = Skill.objects.all()
    # Order by 'order' field, take first 3
    experiences = Experience.objects.all().order_by('order')[:3]
    projects = Project.objects.all().order_by('order')
    
    return render(request, 'portfolio/home.html', {
        'skills': skills,
        'experiences': experiences,
        'projects': projects,
    })


def all_experience(request):
    # Fetch all experiences for the history page
    experience_list = Experience.objects.all().order_by('order')
    
    # Set up pagination (3 cards per page as seen in your image)
    paginator = Paginator(experience_list, 3) 
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    return render(request, 'portfolio/all_experience.html', {'page_obj': page_obj})

def project_detail(request, pk):
    # This view handles the individual project page
    project = get_object_or_404(Project, pk=pk)
    return render(request, 'portfolio/project_detail.html', {'project': project})

def all_projects(request):
    # Fetch all projects ordered by your custom 'order' field
    project_list = Project.objects.all().order_by('order')
    
    # Show 6 projects per page
    paginator = Paginator(project_list, 6) 
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    return render(request, 'portfolio/all_projects.html', {'page_obj': page_obj})