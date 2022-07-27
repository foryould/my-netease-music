import { getSongsDetail, playSongs } from '@/api/play'
import { getSongLyrics } from '@/api/play'
import { formatTime } from '@/utils/index.js'
export const playing = {
  namespaced: true,
  state: {
    songUrl: undefined,
    songs: undefined,
    songId: undefined,
    lyrics: undefined,
    isShowPlayDawer: false,
    isPlay: 'pause',
  },
  mutations: {
    setSongs(state, songs) {
      state.songs = songs
    },
    setSongUrl(state, url) {
      state.songUrl = url
    },
    setSongId(state, id) {
      state.songId = id
    },
    setLyric(state, lyrics) {
      state.lyrics = lyrics
    },
    setPlayDrawer(state, isShowPlayDawer) {
      state.isShowPlayDawer = isShowPlayDawer
    },
    setPlayState(state, isPlay) {
      state.isPlay = isPlay
    },
  },
  actions: {
    async loadSongsDetail(context, id) {
      try {
        const data = await getSongsDetail(id)
        context.commit('setSongs', data.songs[0])
      } catch (e) {
        console.error(e)
      }
    },
    changeSong(context, id) {
      context.dispatch('loadSongsDetail', id)
      context.dispatch('loadSongsUrl', id)
      context.dispatch('loadLyrics', id)
      context.commit('setSongId', id)
    },
    async loadSongsUrl(context, id) {
      try {
        const data = await playSongs(id)
        context.commit('setSongUrl', data.data[0].url)
      } catch (e) {
        console.error(e)
      }
    },
    async loadLyrics(context, id) {
      try {
        const data = await getSongLyrics(id)
        const lyrics = data.lrc.lyric
        const lineLyric = lyrics.split(/\n/)
        const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/
        const l = []
        lineLyric.forEach((item) => {
          const obj = {}
          const time = item.match(regTime)
          obj.lyric = item.split(']')[1] === '' ? '' : item.split(']')[1]
          obj.time = time ? formatTime(time[0].slice(1, time[0].length - 1)) : 0
          l.push(obj)
        })
        context.commit(
          'setLyric',
          l.filter((item) => {
            return item.lyric !== ''
          })
        )
      } catch (e) {
        console.error(e)
      }
    },
  },
}
