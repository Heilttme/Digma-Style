# Generated by Django 4.0.6 on 2022-09-11 09:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0006_alter_shopuser_access_token_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shopuser',
            name='access_token',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='shopuser',
            name='refresh_token',
            field=models.CharField(default='', max_length=255),
        ),
    ]
