from django.apps import AppConfig


class NotificationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'notifications'


    def ready(self):
        # import signals to connect handlers
        from . import signals  # noqa: F401