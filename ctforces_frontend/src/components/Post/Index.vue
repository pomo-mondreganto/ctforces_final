<template>
    <div v-if="!$types.isNull(post)">
        <div class="p-r" v-if="!$types.isNull(post) && post.can_edit_post">
            <div class="a-tr">
                <router-link
                    :to="{ name: 'post_edit', params: { id: post.id } }"
                    class="btn nlnk"
                >
                    Edit post
                </router-link>
            </div>
        </div>
        <router-link
            :to="{ name: 'post_index', params: { id: post.id } }"
            class="header link"
        >
            {{ post.title }}
        </router-link>
        <div class="mt-1-5">
            <span>By </span>
            <user
                :username="post.author_username"
                :rating="post.author_rating"
            />, {{ new Date(post.created_at) }}
        </div>
        <div class="hr mt-1" />
        <div class="content mt-1">
            <div class="markdown ml-1 p-1">
                <markdown :content="post.body" />
            </div>
        </div>
    </div>
</template>

<script>
import Markdown from '@/components/Markdown/Index';

export default {
    props: {
        post: Object,
    },

    components: {
        Markdown,
    },
};
</script>

<style lang="scss" scoped>
.content {
    @include use-theme {
        border-left: 0.3em solid $gray;
    }
}

.header {
    font-size: 1.5em;
}
</style>
