from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=100)
    # Changed help_str to help_text
    icon = models.FileField(upload_to='skills/', help_text="Upload SVG or PNG") 
    order = models.IntegerField(default=0, help_text="Higher number appears first")

    def __str__(self): # Also fixed the typo here (__cl__ to __str__)
        return self.name

    class Meta:
        ordering = ['-order']


class Experience(models.Model):
    title = models.CharField(max_length=100) # e.g., Frontend Engineer
    company = models.CharField(max_length=100) # e.g., Floating Binary
    location = models.CharField(max_length=100) # e.g., Waterloo, Canada
    logo = models.ImageField(upload_to='experience_logos/')
    start_date = models.CharField(max_length=50) # Using string for flexibility like "Feb 2024"
    end_date = models.CharField(max_length=50, default="Present")
    order = models.IntegerField(default=0) # To control display order
    summary = models.CharField(max_length=255, blank=True, help_text="A short one-line catchphrase")
    description = models.TextField(blank=True, help_text="Detailed responsibilities and achievements")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.title} at {self.company}"
    
class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/')
    tech_stack = models.CharField(max_length=200, help_text="Comma separated: Nextjs, TypeScript")
    live_link = models.URLField(blank=True)
    order = models.IntegerField(default=0)

    def get_tech_list(self):
        """Splits the comma-separated string into a list for the template pills"""
        if self.tech_stack:
            return [tech.strip() for tech in self.tech_stack.split(',')]
        return []
    

class Service(models.Model):
    title = models.CharField(max_length=100)
    icon_class = models.CharField(max_length=50, help_text="FontAwesome class, e.g., 'fas fa-code'")
    description = models.TextField()
    points = models.TextField(help_text="Separate points with new lines")
    order = models.IntegerField(default=0)

    def get_points_list(self):
        return self.points.split('\n')
    

class Appointment(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    date = models.DateField()
    time_slot = models.TimeField()
    meeting_link = models.URLField(blank=True, null=True) # For the Google Meet link

    def __str__(self):
        return f"{self.name} - {self.date} at {self.time_slot}"