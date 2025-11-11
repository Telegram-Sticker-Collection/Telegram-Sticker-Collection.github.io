<script setup>
import { shuffle } from '@/utils'
</script>

<template>
  <div v-if="stickers.tgs.length > 0" class="header-2">animated stickers</div>
  <div class="thumbnail-container">
    <tgs-player
      class="thumbnail"
      v-for="item in stickers.tgs"
      :key="item"
      loop
      hover
      mode="normal"
      v-on:click="$router.push(`/pack/${item.packName}`)"
      :src="`https://telegram-sticker-collection.github.io/Stickers/files/${item.stickerFile}`"
    >
    </tgs-player>
  </div>
  <div v-if="stickers.webp.length > 0" class="header-2">static stickers</div>
  <div class="thumbnail-container">
    <img
      class="thumbnail"
      v-for="item in stickers.webp"
      :key="item"
      v-on:click="$router.push(`/pack/${item.packName}`)"
      :src="`https://telegram-sticker-collection.github.io/Stickers/files/${item.stickerFile}`"
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
      stickers: { tgs: [], webp: [] },
    }
  },
  computed: {},
  created() {
    fetch('https://telegram-sticker-collection.github.io/Stickers/emoji_index.json')
      .then((response) => {
        response
          .json()
          .then((data) => {
            const stickerFiles = data[this.$route.params.emoji]
            const stickers = { tgs: [], webp: [] }
            stickerFiles.forEach((stickerFile) => {
              const packName = stickerFile.split('/')[0]
              if (stickerFile.endsWith('.tgs')) {
                stickers.tgs.push({ packName, stickerFile })
              } else if (stickerFile.endsWith('.webp')) {
                stickers.webp.push({ packName, stickerFile })
              }
            })
            shuffle(stickers.tgs)
            shuffle(stickers.webp)
            this.stickers = stickers
          })
          .catch()
      })
      .catch()
  },
  methods: {},
}
</script>
