from django.apps import AppConfig


class LikesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'likes'


    def ready(self):
        # import signals so they are registered when Django starts
        from . import signals  # noqa: F401