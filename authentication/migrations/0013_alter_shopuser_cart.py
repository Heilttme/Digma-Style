# Generated by Django 4.0.6 on 2022-09-18 15:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0012_alter_shopuser_cart_alter_shopuser_liked'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shopuser',
            name='cart',
            field=models.JSONField(default={}),
        ),
    ]