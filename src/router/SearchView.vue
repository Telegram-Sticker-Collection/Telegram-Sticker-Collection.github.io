
<script setup>
import { fetchJson } from '@/utils'
</script>

<template>
  <div class="header-2">select an emoji to search</div>
  <div class="emoji-container">
    <div
      class="emoji"
      v-for="emoji in emojis"
      :key="emoji"
      v-on:click="$router.push(`/search/${emoji}`)"
    >
      {{ emoji }}
    </div>
  </div>
</template>

<style scoped>
.emoji-container {
  display: flex;
  flex-flow: row wrap;
  gap: 0.25em;
}
.emoji {
  /* min-width: 1em; */
  cursor: pointer;
}
</style>

<script>
export default {
  data() {
    return {
      emojiIndex: {},
      emojis: [],
      stickers: {
        tgs: [],
        webp: [],
      },
    }
  },
  computed: {},
  created() {
    fetchJson('https://telegram-sticker-collection.github.io/Stickers/emoji_index.json').then((data) => {
      if (!data) return
      this.emojiIndex = data
      this.emojis = Object.keys(data).sort()
    })
  },
  methods: {},
}
</script>
