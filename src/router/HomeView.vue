<template>
  <div class="header-2">animated stickers</div>
  <StickerGrid :cards="tgsCards" size="small" />
  <div class="header-2">static stickers</div>
  <StickerGrid :cards="webpCards" size="small" />
</template>

<script>
import { shuffle, fetchJson } from '@/utils'
import StickerGrid from '@/components/StickerGrid.vue'

export default {
  components: { StickerGrid },
  data() {
    return {
      packs: { tgs: [], webp: [] },
      tgsCards: [],
      webpCards: [],
    }
  },
  async created() {
    const data = await fetchJson('https://telegram-sticker-collection.github.io/Stickers/thumbnails.json')
    if (data) {
      const packs = data
      shuffle(packs.tgs)
      shuffle(packs.webp)
      this.packs = packs
      this.tgsCards = packs.tgs.map((item) => ({ key: item, src: `https://telegram-sticker-collection.github.io/Stickers/files/${item}/thumbnail.tgs`, extension: 'tgs', route: `/pack/${item}` }))
      this.webpCards = packs.webp.map((item) => ({ key: item, src: `https://telegram-sticker-collection.github.io/Stickers/files/${item}/thumbnail.webp`, extension: 'webp', route: `/pack/${item}` }))
    }
  },
}
</script>
