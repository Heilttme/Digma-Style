from django.db import models

class Item(models.Model):
    brand = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    pictures = models.JSONField()
    price = models.FloatField()
    sizes = models.CharField(max_length=255)
    info = models.JSONField(default={"colour": "", "category": ""})
    reviews = models.ForeignKey("api.Review", on_delete=models.CASCADE, null=True, blank=True)


class Review(models.Model):
    rating = models.IntegerField()
    description = models.CharField(max_length=255)
    user = models.ForeignKey("authentication.ShopUser", on_delete=models.CASCADE, null=True)


class Cart(models.Model):
    items_list = models.JSONField()

class Liked(models.Model):
    items_list = models.JSONField()
