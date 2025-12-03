<script setup></script>

<template>
  <div class="header-2">
    {{ title }}
    <a class="add-btn" :href="link">add {{ typeName }} to telegram</a>
  </div>
  <StickerGrid :cards="stickers" size="large" />
  <template v-if="premium_stickers.length > 0">
    <div class="header-2 smaller">premium animation</div>
    <StickerGrid :cards="premium_stickers" size="large" />
  </template>
</template>

<script>
import { fetchJson } from '@/utils'
import StickerGrid from '@/components/StickerGrid.vue'

export default {
  components: { StickerGrid },
  data() {
    return {
      title: '',
      link: '',
      typeName: '',
      stickers: [],
      premium_stickers: [],
    }
  },
  async created() {
    const data = await fetchJson(`https://telegram-sticker-collection.github.io/Stickers/info/${this.$route.params.packName}.json`)
    if (!data) return
    this.title = data.title
    if (data.sticker_type === 'regular') {
      this.link = `https://t.me/addstickers/${data.name}`
      this.typeName = 'stickers'
    } else if (String(data.sticker_type).includes('emoji')) {
      this.link = `https://t.me/addemoji/${data.name}`
      this.typeName = 'emojis'
    }
    data.stickers.forEach((sticker) => {
      let s = {
        id: sticker.file_unique_id,
        src: `https://telegram-sticker-collection.github.io/Stickers/files/${this.$route.params.packName}/${sticker.file_unique_id}.${sticker.extension}`,
        extension: sticker.extension,
        premium_animation: sticker.premium_animation !== undefined,
      }
      if (s.premium_animation) {
        this.premium_stickers.push(s)
      } else {
        this.stickers.push(s)
      }
    })
  },
}
</script>
