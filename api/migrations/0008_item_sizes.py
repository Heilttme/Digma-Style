# Generated by Django 4.0.6 on 2022-10-05 09:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_cart_liked'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='sizes',
            field=models.CharField(default='XS;S;M;L', max_length=255),
            preserve_default=False,
        ),
    ]