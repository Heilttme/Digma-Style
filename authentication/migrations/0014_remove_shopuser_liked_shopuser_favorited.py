# Generated by Django 4.0.6 on 2022-09-27 13:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0013_alter_shopuser_cart'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shopuser',
            name='liked',
        ),
        migrations.AddField(
            model_name='shopuser',
            name='favorited',
            field=models.JSONField(default={}),
        ),
    ]
