<script setup></script>

<template>
  <div class="header-1">telegram sticker collection</div>
  <div class="header-2">animated stickers</div>
  <div class="thumbnail-container">
    <tgs-player
      class="thumbnail"
      v-for="item in packs.tgs"
      :key="item"
      loop
      hover
      mode="normal"
      :src="`https://telegram-sticker-collection.github.io/Stickers/files/${item}/thumbnail.tgs`"
    >
    </tgs-player>
  </div>
  <div class="header-2">static stickers</div>
  <div class="thumbnail-container">
    <img
      class="thumbnail"
      v-for="item in packs.webp"
      :key="item"
      :src="`https://telegram-sticker-collection.github.io/Stickers/files/${item}/thumbnail.webp`"
    />
  </div>
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
.thumbnail-container {
  display: flex;
  flex-flow: row wrap;
  gap: 0.25em;
}
.thumbnail {
  width: 4em;
  height: 4em;
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
.header-1,
.header-2,
.footnote {
  background-color: #faf6e9;
  color: #495b37;
  font-size: xx-large;
  font-family:
    'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana,
    sans-serif;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
}
.header-2 {
  font-size: x-large;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.footnote {
  font-size: small;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  margin-top: 0.5em;
}
.footnote a {
  color: #495b37;
}
</style>
<!-- 9BD6FF -->
<!-- 6FFFC7 -->
<script>
function shuffle(array) {
  let currentIndex = array.length

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }
}

export default {
  data() {
    return {
      // windowHeight: window.innerHeight,
      // windowWidth: window.innerWidth,
      // inLoading: true,
      packs: {
        tgs: [],
        webp: [],
      },
    }
  },
  computed: {},
  created() {
    window.addEventListener('load', this.onLoad)
    // this.$nextTick(() => {
    //   window.addEventListener('resize', this.onResize)
    // })
    fetch('https://telegram-sticker-collection.github.io/Stickers/thumbnails.json')
      .then((response) => {
        response
          .json()
          .then((data) => {
            let packs = {
              tgs: [],
              webp: [],
            }
            for (const packName in data) {
              const thumbnailFormat = data[packName]
              if (thumbnailFormat === 'tgs') {
                packs.tgs.push(packName)
              } else if (thumbnailFormat === 'webp') {
                packs.webp.push(packName)
              }
            }
            shuffle(packs.tgs)
            shuffle(packs.webp)
            this.packs = packs
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
