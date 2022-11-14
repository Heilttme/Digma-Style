from rest_framework import serializers
from .models import ShopUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopUser
        fields = ["username", "email", "password"]