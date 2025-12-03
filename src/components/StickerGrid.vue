<template>
  <div class="thumbnail-container">
    <template v-for="card in cards" :key="card.key || card.id || card.src">
      <tgs-player
        v-if="card.extension === 'tgs'"
        class="thumbnail"
        :class="thumbnailClass(card)"
        loop
        hover
        mode="normal"
        :src="card.src"
        @click="onClick(card)"
      ></tgs-player>

      <video
        v-else-if="card.extension === 'webm'"
        class="thumbnail"
        :class="thumbnailClass(card)"
        :src="card.src"
        muted
        loop
        playsinline
        @click="onClick(card)"
        @mouseenter="playCard($event)"
        @mouseleave="pauseCard($event)"
      ></video>

      <img
        v-else
        class="thumbnail"
        :class="thumbnailClass(card)"
        :src="card.src"
        @click="onClick(card)"
      />
    </template>
  </div>
</template>

<script>
import { showLoading, hideLoading } from '@/loader'

export default {
  name: 'StickerGrid',
  props: {
    cards: { type: Array, default: () => [] },
    size: { type: String, default: 'small' },
  },
  data() {
    return {
      mediaMap: new Map(),
    }
  },
  mounted() {
    this._attachAll()
  },
  updated() {
    // re-scan when list updates
    this._attachAll()
  },
  beforeUnmount() {
    this._detachAll()
  },
  methods: {
    thumbnailClass(card) {
      return [this.size === 'large' ? 'large' : 'small', { clickable: card.route }]
    },
    onClick(card) {
      if (card.route) {
        this.$router.push(card.route)
      }
    },
    playCard(evt) {
      const el = evt.currentTarget || evt.target
      if (!el) return
      try {
        el.muted = true
        el.loop = true
        el.play()
      } catch {
        // play may be blocked; ignore
      }
    },
    pauseCard(evt) {
      const el = evt.currentTarget || evt.target
      if (!el) return
      try {
        el.pause()
        el.currentTime = 0
      } catch {
        // ignore
      }
    },

    _attachAll() {
      if (!this.$el) return
      const nodes = Array.from(this.$el.querySelectorAll('.thumbnail'))
      nodes.forEach((el) => this._attachElement(el))
    },

    _attachElement(el) {
      if (this.mediaMap.has(el)) return

      const tag = (el.tagName || '').toLowerCase()
      // 'loaded' flag removed because it's unused; rely on map entries and events

      const markLoaded = () => {
        if (!this.mediaMap.has(el)) return
        const entry = this.mediaMap.get(el)
        if (entry && entry.counted) {
          hideLoading()
        }
        // cleanup listeners
        if (entry && entry.cleanup) entry.cleanup()
        this.mediaMap.delete(el)
      }

      const onLoaded = () => markLoaded()
      const onError = () => markLoaded()

      const listeners = []

      const addListener = (ev, fn) => {
        el.addEventListener(ev, fn)
        listeners.push([ev, fn])
      }

      // Determine if already loaded
      try {
        if (tag === 'img') {
          if (!el.complete || (el.naturalWidth === 0 && el.naturalHeight === 0)) {
            showLoading()
            addListener('load', onLoaded)
            addListener('error', onError)
            this.mediaMap.set(el, { counted: true, cleanup: () => listeners.forEach(l => el.removeEventListener(l[0], l[1])) })
          }
        } else if (tag === 'video') {
          // readyState >= 3 indicates data is available
          const ready = el.readyState >= 3
          if (!ready) {
            showLoading()
            addListener('loadeddata', onLoaded)
            addListener('loadedmetadata', onLoaded)
            addListener('error', onError)
            // also handle canplaythrough as fallback
            addListener('canplaythrough', onLoaded)
            this.mediaMap.set(el, { counted: true, cleanup: () => listeners.forEach(l => el.removeEventListener(l[0], l[1])) })
          }
        } else {
          // custom elements (e.g., tgs-player)
          // attempt to detect load by listening to common events
          // assume not loaded and increment loader
          showLoading()
          addListener('load', onLoaded)
          addListener('loaded', onLoaded)
          addListener('loadeddata', onLoaded)
          addListener('ready', onLoaded)
          addListener('error', onError)
          // always set a maximum timeout to avoid leaving loader stuck
          let probeTimer = null
          let maxTimer = null
          // try to read src from attribute or property (Vue may set property instead of attribute)
          let src = (el.getAttribute && el.getAttribute('src')) || (el.src || null)

          if (src) {
            // probe after a short delay to allow native events to fire first
            probeTimer = setTimeout(() => {
              try {
                fetch(src, { method: 'HEAD' }).then((resp) => {
                  if (!resp.ok) {
                    onError()
                  }
                }).catch(() => {
                  // network error or CORS; treat as error to avoid stuck loader
                  onError()
                })
              } catch {
                onError()
              }
            }, 6000)
          }

          // ensure we always clear the loader after a maximum wait (fallback)
          maxTimer = setTimeout(() => {
            onError()
          }, 12000)

          this.mediaMap.set(el, {
            counted: true,
            cleanup: () => {
              if (probeTimer) clearTimeout(probeTimer)
              if (maxTimer) clearTimeout(maxTimer)
              listeners.forEach((l) => el.removeEventListener(l[0], l[1]))
            },
          })
        }
      } catch {
        // if anything goes wrong, ensure we don't leave inconsistent state
        if (this.mediaMap.has(el)) {
          const entry = this.mediaMap.get(el)
          if (entry && entry.counted) hideLoading()
          if (entry && entry.cleanup) entry.cleanup()
          this.mediaMap.delete(el)
        }
      }
    },

    _detachAll() {
      for (const [, entry] of this.mediaMap.entries()) {
        try {
          if (entry && entry.cleanup) entry.cleanup()
          if (entry && entry.counted) hideLoading()
        } catch (err) {
          void err
        }
      }
      this._mediaMap.clear()
    },
  },
}
</script>

