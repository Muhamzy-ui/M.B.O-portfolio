from django.shortcuts import render

def about_page(request):
    # This view is for the standalone "About" page
    return render(request, 'about/about_standalone.html')



