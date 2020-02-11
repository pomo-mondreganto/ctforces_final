<template>
    <card>
        <f-header text="Tasks" v-if="!$types.isNull(tasks)" />
        <div class="mt-1" v-if="!$types.isNull(tasks)">
            <f-table
                :fields="[
                    { name: '#', pos: 'c' },
                    {
                        name: 'Name',
                        pos: 'l',
                        grow: 7,
                        comp: TaskLinkComp,
                    },
                    { name: 'Cost' },
                    {
                        name: 'Tags',
                        grow: 5,
                        key: 'task_tags_details',
                        comp: TagsComp,
                    },
                    {
                        name: 'Solved',
                        key: 'solved_count',
                        comp: TaskSolvedLinkComp,
                    },
                ]"
                :data="tasks"
            />
        </div>
        <f-detail :errors="errors['detail']" />
    </card>
</template>

<script>
import Card from '@/components/Card/Index';
import FHeader from '@/components/Form/Header';
import FTable from '@/components/Table/Index';
import FDetail from '@/components/Form/Detail';
import Tags from './TaskTags';
import TaskLink from './TaskLink';
import TaskSolvedLink from './TaskSolvedLink';

export default {
    components: {
        Card,
        FHeader,
        FTable,
        FDetail,
    },
    data: function() {
        return {
            tasks: null,
            TagsComp: Tags,
            TaskLinkComp: TaskLink,
            TaskSolvedLinkComp: TaskSolvedLink,
            errors: {},
        };
    },
    created: async function() {
        const { page = 1 } = this.$route;
        try {
            const r = await this.$http.get(`/tasks/?page=${page}`);
            this.tasks = r.data.results.map((row, index) => {
                return { '#': index, ...row };
            });
        } catch (error) {
            this.errors = this.$parse(error.response.data);
        }
    },
};
</script>