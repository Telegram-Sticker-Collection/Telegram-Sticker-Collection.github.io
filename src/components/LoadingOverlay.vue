<template>
  <div class="loading-overlay">
    <div class="loading-box">
      <button class="loading-close" @click="$emit('close')" aria-label="Close loading">×</button>
      <tgs-player
        src="https://telegram-sticker-collection.github.io/Stickers/files/AnimatedEmojies/AgADLQIAAqcjIUQ.tgs"
        autoplay
        loop
        style="width:160px; height:160px;"
      ></tgs-player>
    </div>
  </div>
</template>

<script setup>
// purely presentational component; emits `close` when user clicks the X button
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.45);
  z-index: 9999;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}
.loading-box {
  position: relative;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.95);
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.25);
}
.loading-close {
  position: absolute;
  top: 6px;
  right: 8px;
  width: 28px;
  height: 28px;
  border: none;
  background: rgba(0,0,0,0.06);
  color: #222;
  border-radius: 50%;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
.loading-close:hover {
  background: rgba(0,0,0,0.12);
}
</style>
