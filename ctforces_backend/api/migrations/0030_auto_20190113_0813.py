# Generated by Django 2.1.2 on 2019-01-13 08:13

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('api', '0029_contest_is_rated'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='contesttaskrelationship',
            unique_together={('contest', 'task')},
        ),
    ]