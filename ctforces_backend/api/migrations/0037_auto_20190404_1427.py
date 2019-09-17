# Generated by Django 2.1.7 on 2019-04-04 11:27

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('api', '0036_task_show_on_main_page'),
    ]

    operations = [
        migrations.AddField(
            model_name='contest',
            name='always_recalculate_rating',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='contestparticipantrelationship',
            name='has_opened_contest',
            field=models.BooleanField(default=False),
        ),
    ]
