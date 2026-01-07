from django.contrib import admin
from .models import Skill, Experience, Project  # Import Project here
from django.utils.html import format_html

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'order', 'display_icon')
    
    def display_icon(self, obj):
        if obj.icon:
            return format_html('<img src="{}" style="width: 30px; height:30px;" />', obj.icon.url)
        return "No Icon"
    display_icon.short_description = 'Icon Preview'

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'start_date', 'end_date', 'order')
    list_editable = ('order',) # Allows you to change order without clicking into the object

# --- ADD THIS FOR PROJECTS ---
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'order', 'display_image')
    list_editable = ('order',)
    
    def display_image(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="width: 50px; height:auto; border-radius: 5px;" />', obj.image.url)
        return "No Image"
    display_image.short_description = 'Thumbnail'