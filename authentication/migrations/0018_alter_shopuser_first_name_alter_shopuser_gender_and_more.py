# Generated by Django 4.0.6 on 2022-11-20 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0017_remove_shopuser_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shopuser',
            name='first_name',
            field=models.CharField(default='', max_length=24),
        ),
        migrations.AlterField(
            model_name='shopuser',
            name='gender',
            field=models.CharField(default='', max_length=1),
        ),
        migrations.AlterField(
            model_name='shopuser',
            name='last_name',
            field=models.CharField(default='', max_length=24),
        ),
    ]
