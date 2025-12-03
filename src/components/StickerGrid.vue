<template>
  <div class="thumbnail-container">
    <component
      v-for="card in cards"
      :is="card.extension === 'tgs' ? 'tgs-player' : 'img'"
      :key="card.key || card.id || card.src"
      class="thumbnail"
      :class="[size === 'large' ? 'large' : 'small', { clickable: card.route }]"
      v-bind="card.extension === 'tgs' ? { loop: true, hover: true, mode: 'normal', src: card.src } : { src: card.src }"
      @click="onClick(card)"
    />
  </div>
</template>

<script>
export default {
  name: 'StickerGrid',
  props: {
    cards: { type: Array, default: () => [] },
    size: { type: String, default: 'small' },
  },
  methods: {
    onClick(card) {
      if (card.route) {
        this.$router.push(card.route)
      }
    },
  },
}
</script>
