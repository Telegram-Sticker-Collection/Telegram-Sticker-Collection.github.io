<script setup></script>

<template>
  <div class="header-1">
    telegram sticker collection
    <a v-if="$route.path === '/'" v-on:click="$router.push(`/search`)" class="search-btn"
      >search with emoji</a
    >
    <a v-else v-on:click="$router.back()" class="back-btn">back</a>
  </div>
  <main>
    <RouterView />
  </main>
  <LoadingOverlay v-if="loading" @close="manualDismiss = true" />
  <div class="footnote">
    Open source at
    <a href="https://github.com/Telegram-Sticker-Collection/Stickers"
      >https://github.com/Telegram-Sticker-Collection/Stickers</a
    >
    <br />
    Licences: All stickers are the property of their respective artists. The repository creator
    disclaims any ownership and takes no responsibility for misuse. If any artist wishes for their
    work to be removed from this repository, please contact us, and we will promptly remove it.
  </div>
</template>

<style scoped>
.header-1 {
  font-weight: 700;
  padding: 16px 20px;
}
main {
  padding: 18px 20px 96px;
}
.footnote {
  padding: 8px 20px 40px;
  font-size: 13px;
  color: #444;
}
</style>

<script>
import LoadingOverlay from './components/LoadingOverlay.vue'
import { subscribeLoading } from './loader'

export default {
  components: { LoadingOverlay },
  data() {
    return {
      routerLoading: false,
      fetchLoading: false,
      unsubscribeLoader: null,
      manualDismiss: false,
    }
  },
  computed: {
    loading() {
      return (this.routerLoading || this.fetchLoading) && !this.manualDismiss
    },
  },
  created() {
    const self = this
    if (this.$router) {
      this.$router.beforeEach((to, from, next) => {
        self.routerLoading = true
        next()
      })
      this.$router.afterEach(() => {
        // small delay to ensure animation is visible for very fast navigations
        setTimeout(() => (self.routerLoading = false), 80)
      })
    }

    // subscribe to fetch-based loading events
    this.unsubscribeLoader = subscribeLoading((isOn) => {
      self.fetchLoading = !!isOn
    })
    // reset manual dismiss when loading fully stops
    this.$watch(
      () => (self.routerLoading || self.fetchLoading),
      (val) => {
        if (!val) {
          self.manualDismiss = false
        }
      }
    )
  },
  beforeUnmount() {
    if (this.unsubscribeLoader) this.unsubscribeLoader()
  },
}
</script>
