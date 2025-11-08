<script setup></script>

<template>
  <div class="header-2">{{ title }}</div>
  <div class="thumbnail-container">
    <template v-for="item in stickers" :key="item.id">
      <tgs-player
        class="thumbnail"
        v-if="item.extension === 'tgs'"
        loop
        hover
        mode="normal"
        :src="item.src"
      >
      </tgs-player>
      <img class="thumbnail" v-if="item.extension === 'webp'" :src="item.src" />
    </template>
  </div>
</template>

<style scoped>
.thumbnail-container {
  display: flex;
  flex-flow: row wrap;
  gap: 0.25em;
}
.thumbnail {
  width: 8em;
  height: 8em;
  object-fit: contain;

  background-color: wheat;
  border-radius: 1em;
  padding: 0.25em;
  &:nth-child(odd) {
    background-color: #e4e4e4;
  }

  &:nth-child(even) {
    background-color: #f1f1f1;
  }
}
</style>

<script>
export default {
  data() {
    return {
      // windowHeight: window.innerHeight,
      // windowWidth: window.innerWidth,
      // inLoading: true,
      title: '',
      link: '',
      stickers: [],
    }
  },
  computed: {},
  created() {
    // window.addEventListener('load', this.onLoad)
    // this.$nextTick(() => {
    //   window.addEventListener('resize', this.onResize)
    // })
    fetch(
      `https://telegram-sticker-collection.github.io/Stickers/info/${this.$route.params.packName}.json`,
    )
      .then((response) => {
        response
          .json()
          .then((data) => {
            this.title = data.title
            if (data.sticker_type === 'regular') {
              this.link = `https://t.me/addstickers/${data.name}`
            } else if (data.sticker_type === 'emoji') {
              this.link = `https://t.me/addemoji/${data.name}`
            }
            data.stickers.forEach((sticker) => {
              this.stickers.push({
                id: sticker.file_unique_id,
                src: `https://telegram-sticker-collection.github.io/Stickers/files/${this.$route.params.packName}/${sticker.file_unique_id}.${sticker.extension}`,
                extension: sticker.extension,
                premium: sticker.premium_animation !== undefined,
              })
            })
          })
          .catch()
      })
      .catch()
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
