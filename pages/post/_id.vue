<template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <h1>{{post.title}} </h1>
        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
      </div>
      <div class="post-date">
        <small>{{new Date(post.date).toLocaleString()}}</small>
        <small>{{post.views}}</small>
      </div>
      <div class="post-img">
        <img :src="post.imageUrl" alt="">
      </div>
    </header>

    <main class="post-text">
      <vue-markdown>{{post.text}}</vue-markdown>
    </main>

    <div v-if="canAddComment">
      <app-comment-form
        :postId="post._id"
        @created="handleCreateComment"
      />
    </div>

    <div class="comments" v-if="post.comments.length">
      <app-comment
        v-for="comment in post.comments"
        :comment="comment"
        :key="comment._id"
      />
    </div>
    <div style="text-align: center;" v-else>Комментариев нет</div>
  </article>
</template>

<script>
import AppComment from '@/components/main/Comment'
import AppCommentForm from '@/components/main/CommentForm'

export default {
  head() {
    return {
      title: `Пост | ${this.post.title}`
    }
  },
  async asyncData({store, params}) {
    const post = await store.dispatch('post/fetchById', params.id)
    post.views++
    await store.dispatch('post/addView', post)
    return {post}
  },
  validate({params}) {
    return Boolean(params.id)
  },
  data() {
    return {
      canAddComment: true
    }
  },
  methods: {
    handleCreateComment(comment) {
      this.canAddComment = false
      this.post.comments.unshift(comment)
    }
  },
  components: {
    AppComment, AppCommentForm
  }
}
</script>

<style lang="scss" scoped>
  .post {
    max-width: 600px;
    margin: 0 auto;
  }

  .post-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .post-date {
    margin-bottom: .5rem;
    display: flex;
    justify-content: space-between;
  }

  .post-img {
    img {
      width: 100%;
      height: auto;
    }
  }

  .post-header {
    margin-bottom: 1.5rem;
  }

  .post-text {
    margin-bottom: 2rem;
  }
</style>
