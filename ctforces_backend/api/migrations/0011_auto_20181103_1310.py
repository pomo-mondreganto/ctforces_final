# Generated by Django 2.1.2 on 2018-11-03 13:10

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('api', '0010_auto_20181103_0744'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='task',
            options={'ordering': ('id',)},
        ),
        migrations.AlterModelOptions(
            name='taskfile',
            options={'ordering': ('id',)},
        ),
    ]