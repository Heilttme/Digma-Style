# Generated by Django 4.0.6 on 2022-09-05 13:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_item_reviews'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='reviews',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.review'),
        ),
    ]
