<script setup></script>

<template>
  <div class="header-1">
    telegram sticker collection
    <template v-if="$route.path !== '/'">
      <a
        v-if="$route.path !== '/search' && $route.path.startsWith('/search')"
        v-on:click="$router.push(`/search`)"
        class="back-btn"
        >back to search</a
      >
      <a v-else v-on:click="$router.push(`/`)" class="back-btn">back to list</a>
    </template>
  </div>
  <main>
    <RouterView />
  </main>
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

<style scoped></style>

<script>
export default {
  data() {
    return {
      // windowHeight: window.innerHeight,
      // windowWidth: window.innerWidth,
      // inLoading: true,
      // packs: {
      //   tgs: [],
      //   webp: [],
      // },
    }
  },
  computed: {},
  created() {
    // window.addEventListener('load', this.onLoad)
    // this.$nextTick(() => {
    //   window.addEventListener('resize', this.onResize)
    // })
    // fetch('https://telegram-sticker-collection.github.io/Stickers/thumbnails.json')
    //   .then((response) => {
    //     response
    //       .json()
    //       .then((data) => {
    //         let packs = {
    //           tgs: [],
    //           webp: [],
    //         }
    //         for (const packName in data) {
    //           const thumbnailFormat = data[packName]
    //           if (thumbnailFormat === 'tgs') {
    //             packs.tgs.push(packName)
    //           } else if (thumbnailFormat === 'webp') {
    //             packs.webp.push(packName)
    //           }
    //         }
    //         shuffle(packs.tgs)
    //         shuffle(packs.webp)
    //         this.packs = packs
    //       })
    //       .catch()
    //   })
    //   .catch()
  },
  methods: {
    // onLoad() {
    //   this.inLoading = false
    // },
    // onResize() {
    //   this.windowHeight = window.innerHeight
    //   this.windowWidth = window.innerWidth
    // },
  },
}
</script>
