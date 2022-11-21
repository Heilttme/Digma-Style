from django.db import models
from django.contrib.auth.models import AbstractUser
from django import utils
from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.urls import reverse

class ShopUser(AbstractUser):
    username = models.CharField(max_length=12, null=True)
    email = models.EmailField(unique=True)
    cart = models.JSONField(default={})
    favorited = models.JSONField(default={})

    first_name = models.CharField(max_length=24, default="")
    last_name = models.CharField(max_length=24, default="")
    gender = models.CharField(max_length=1, default="")

    refresh_token = models.CharField(max_length=255, default="")
    access_token = models.CharField(max_length=255, default="")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]


    def get_password_reset_url(self):
        base64_encoded_id = utils.http.urlsafe_base64_encode(utils.encoding.force_bytes(self.id))
        token = PasswordResetTokenGenerator().make_token(self)
        reset_url_args = {'uidb64': base64_encoded_id, 'token': token}
        reset_path = reverse('password_reset_confirm', kwargs=reset_url_args)
        reset_url = f'{settings.BASE_URL}{reset_path}'
        return reset_url