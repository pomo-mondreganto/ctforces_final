from guardian.shortcuts import assign_perm
from rest_framework import serializers as rest_serializers

from api import fields as api_fields
from api import models as api_models


class TaskTagSerializer(rest_serializers.ModelSerializer):
    class Meta:
        model = api_models.TaskTag
        fields = ('id', 'name')

    @staticmethod
    def validate_name(data):
        data = data.lower()
        if api_models.TaskTag.objects.filter(name=data).exists():
            raise rest_serializers.ValidationError('Tag with this name already exists.')
        return data


class TaskPreviewSerializer(rest_serializers.ModelSerializer):
    solved_count = rest_serializers.IntegerField(read_only=True)
    task_tags_details = TaskTagSerializer(many=True, read_only=True, source='tags')
    is_solved_by_user = rest_serializers.BooleanField(read_only=True)

    class Meta:
        model = api_models.Task
        fields = (
            'id',
            'author',
            'cost',
            'is_published',
            'is_solved_by_user',
            'name',
            'publication_time',
            'solved_count',
            'task_tags_details',
        )


class TaskFileMainSerializer(rest_serializers.ModelSerializer):
    task_details = TaskPreviewSerializer(read_only=True, source='task')

    class Meta:
        model = api_models.TaskFile
        fields = (
            'id',
            'file_field',
            'name',
            'task_details',
            'upload_time',
            'owner',
        )
        extra_kwargs = {
            'owner': {
                'required': False,
            },
            'name': {
                'required': False,
            },
        }

    def __init__(self, *args, **kwargs):
        self.filename = None
        super(TaskFileMainSerializer, self).__init__(*args, **kwargs)

    def validate_file_field(self, data):
        self.filename = data.name
        return data

    def validate(self, attrs):
        attrs['name'] = self.filename
        attrs['owner'] = self.context['request'].user
        return attrs


class TaskFileViewSerializer(rest_serializers.ModelSerializer):
    class Meta:
        model = api_models.TaskFile
        fields = (
            'id',
            'file_field',
            'name',
            'upload_time',
        )


class TaskViewSerializer(rest_serializers.ModelSerializer):
    solved_count = rest_serializers.IntegerField(read_only=True)
    tags_details = TaskTagSerializer(many=True, read_only=True, source='tags')
    files_details = TaskFileViewSerializer(many=True, read_only=True, source='files')
    can_edit_task = rest_serializers.BooleanField(read_only=True)
    is_solved_by_user = rest_serializers.BooleanField(read_only=True)

    class Meta:
        model = api_models.Task
        fields = (
            'id',
            'author',
            'can_edit_task',
            'cost',
            'description',
            'files_details',
            'is_published',
            'is_solved_by_user',
            'name',
            'publication_time',
            'solved_count',
            'tags_details',
        )


class TaskFullSerializer(rest_serializers.ModelSerializer):
    solved_count = rest_serializers.IntegerField(read_only=True)
    task_tags_details = TaskTagSerializer(many=True, read_only=True, source='tags')
    files_details = TaskFileViewSerializer(many=True, read_only=True, source='files')
    cost = rest_serializers.IntegerField(min_value=1, max_value=9999)
    files = api_fields.CurrentUserFilteredPrimaryKeyRelatedField(
        filter_field_name='owner',
        many=True,
        read_only=False,
        queryset=api_models.TaskFile.objects.all(),
    )

    class Meta:
        model = api_models.Task
        fields = (
            'id',
            'author',
            'cost',
            'description',
            'files',
            'files_details',
            'flag',
            'is_published',
            'name',
            'publication_time',
            'solved_count',
            'tags',
            'task_tags_details',
        )

        extra_kwargs = {
            'author': {
                'read_only': True,
            },
            'publication_time': {
                'read_only': True,
            },
            'tags': {
                'write_only': True,
            },
            'files': {
                'write_only': True,
            },
        }

    @staticmethod
    def validate_tags(data):
        cur_tags = set()
        for tag in data:
            if tag.id not in cur_tags:
                cur_tags.add(tag.id)
            if len(cur_tags) > 5:
                raise rest_serializers.ValidationError('You are allowed to use 5 tags or less.')
        return data

    @staticmethod
    def validate_files(data):
        if len(data) > 5:
            raise rest_serializers.ValidationError('You are allowed to include 5 files or less.')
        return data

    def validate(self, attrs):
        attrs['author'] = self.context['request'].user
        return attrs

    def create(self, validated_data):
        instance = super(TaskFullSerializer, self).create(validated_data)
        assign_perm('view_task', instance.author, instance)
        assign_perm('change_task', instance.author, instance)
        assign_perm('delete_task', instance.author, instance)
        return instance


class TaskSubmitSerializer(rest_serializers.ModelSerializer):
    class Meta:
        model = api_models.Task
        fields = ('flag',)

    def validate_flag(self, flag):
        if flag != self.instance.flag:
            raise rest_serializers.ValidationError('Invalid flag.')
