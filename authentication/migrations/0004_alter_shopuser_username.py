# Generated by Django 4.0.6 on 2022-09-05 13:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_alter_shopuser_cart_alter_shopuser_liked'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shopuser',
            name='username',
            field=models.CharField(max_length=12, null=True),
        ),
    ]
