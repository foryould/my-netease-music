<template>
  <div class="song-list">
    <div
      class="list-item"
      v-for="(s, index) in songList"
      :key="index"
      @click="onPlaySong(s.id)"
    >
      <div class="song-name">
        <div class="name">{{ s.name }}</div>
        <div class="song-info">
          <div class="song-tag">
            <span
              class="tag"
              v-for="(t, index) in s.tags"
              :key="index"
              :class="`tag-${t.key}`"
            >
              {{ t.tag }}
            </span>
          </div>
          <div class="singer-info">
            <span class="singer">
              <span v-for="(a, i) in s.ar" :key="i"
                >{{ a.name
                }}<template v-if="i < s.ar.length - 1">/</template></span
              >
            </span>
            <template v-if="s.al && s.al.name">
              <span style="color: #b2b2b2">-</span>
              <span class="album">{{ s.al.name }}</span>
            </template>
          </div>
        </div>
      </div>
      <div class="song-icon">
        <div class="icon">
          <icon name="xe710"></icon>
        </div>
        <div class="icon">
          <icon name="xe8c4"></icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from '@/components/Icon.vue'
import { mapActions, mapMutations } from 'vuex'
export default {
  components: { Icon },
  name: 'SongList',
  props: {
    songList: {
      type: Array,
      required: true,
    },
  },
  inject: ['getPlayState'],
  methods: {
    ...mapMutations('playing', ['setPlayDrawer', 'setPlayState']),
    ...mapActions('playing', ['changeSong']),
    async onPlaySong(id) {
      await this.changeSong(id)
      this.getPlayState().audioState('play')
      this.setPlayDrawer(true)
    },
  },
}
</script>
<style lang="scss" scoped>
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3.67rem 0;
  border-top: 1px solid var(--border-color);
}

.song-info {
  display: flex;
  align-items: center;
  font-size: 12px;
  .singer {
    color: #4a83c1;
    margin-right: 1rem;
  }
  .album {
    color: #b2b2b2;
    margin-left: 1rem;
  }
}

.song-icon {
  display: flex;

  i {
    font-size: 6rem;
    color: #b2b2b2;
  }
}

.song-name {
  overflow: hidden;

  .name {
    font-size: 4.27rem;
    color: var(--primary-text-color);
    margin-bottom: 1.67rem;
  }
}

.singer-info {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-tag {
  display: flex;
  white-space: nowrap;
  margin-right: 2rem;
}

.tag {
  font-size: 12px;
  padding: 1px 2px;
  border-radius: 4px;
  flex: 1;

  &:not(:last-child) {
    margin-right: 1rem;
  }
}

.tag-orig {
  background-color: var(--primary-color);
  color: #fff;
}
.tag-sq,
.tag-st,
.tag-hi {
  color: red;
  border: 1px solid red;
}
.tag-vip {
  color: #fd8e57;
  border: 1px solid #fd8e57;
}
</style>
