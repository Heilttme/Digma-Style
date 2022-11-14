# Generated by Django 4.0.6 on 2022-09-11 09:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_alter_shopuser_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='shopuser',
            name='access_token',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='shopuser',
            name='refresh_token',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
