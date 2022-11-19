from django.db import models
from django.contrib.auth.models import AbstractUser


class ShopUser(AbstractUser):
    username = models.CharField(max_length=12, null=True)
    email = models.EmailField(unique=True)
    cart = models.JSONField(default={})
    favorited = models.JSONField(default={})

    first_name = models.CharField(max_length=24, null=True)
    last_name = models.CharField(max_length=24, null=True)
    phone_number = models.CharField(max_length=12, null=True)
    gender = models.CharField(max_length=1, null=True)

    refresh_token = models.CharField(max_length=255, default="")
    access_token = models.CharField(max_length=255, default="")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]