<script setup>
import { shuffle } from '@/utils'
</script>

<template>
  <div class="header-2">animated stickers</div>
  <div class="thumbnail-container">
    <tgs-player
      class="thumbnail"
      v-for="item in packs.tgs"
      :key="item"
      loop
      hover
      mode="normal"
      v-on:click="$router.push(`/pack/${item}`)"
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
      v-on:click="$router.push(`/pack/${item}`)"
      :src="`https://telegram-sticker-collection.github.io/Stickers/files/${item}/thumbnail.webp`"
    />
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

  cursor: pointer;
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
      packs: {
        tgs: [],
        webp: [],
      },
    }
  },
  computed: {},
  created() {
    // window.addEventListener('load', this.onLoad)
    // this.$nextTick(() => {
    //   window.addEventListener('resize', this.onResize)
    // })
    fetch('https://telegram-sticker-collection.github.io/Stickers/thumbnails.json')
      .then((response) => {
        response
          .json()
          .then((data) => {
            let packs = data
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
