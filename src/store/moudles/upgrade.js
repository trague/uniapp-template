import { request } from '@/utils/request'
const noop = function() {}
const tools = {
  /**
   * 获取服务器配置的更新逻辑
   */
  async getServerVersion() {
    try {
      const { status, data, msg } = await request('/api/login/getversion')
      if (+status === 1) {
        return Promise.resolve(data)
      } else {
        reject({ message: msg })
      }
    } catch (error) {
      reject(error)
    }
  },

  /**
   * 获取当前客户端版本号，获取的是wgt版本，因为wgt版本一定要比安装包版本高，需要使用较高的版本同服务器版本比较
   */
  getCurrentVersion() {
    return new Promise((resolve, reject) => {
      plus.runtime.getProperty(plus.runtime.appid, ({ version }) => {
        resolve(version)
      })
    })
  },
  /**
   * 对比版本号，判断是否需要更新
   * @param {*} oldV 旧版本号
   * @param {*} newV 新版本号
   */
  judgeIsNeedUpdate(oldV, newV) {
    // 将版本号切割
    var oldVs = oldV.split('.')
    var newVs = newV.split('.')

    var length = Math.max(oldVs.length, newVs.length)
    for (var i = 0; i < length; i++) {
      var curOld = Number(oldVs[i])
      var curNew = Number(newVs[i])
      // 同一位置的版本号的对比， 如果相等就不处理
      if (curOld < curNew) {
        return true
      } else if (curOld > curNew) {
        return false
      }
    }
    return false
  },

  /**
   * 获取更新参数
   * @param {Object} data
   */
  getOptions(data, currentVersion) {
    const platform = plus.os.name.toLowerCase()
    const opt = {
      // 整包版本
      pkgVersion: platform === 'ios' ? data.ios_version : data.android_version,
      // 整包链接，
      pkgUrl: platform === 'ios' ? data.iphone : data.android,
      // 资源包版本
      wgtVersion: data.version,
      // 资源包URL
      wgtUrl: data.update_package,
    }
    let options = {
      url: '',
      type: '',
      version: '',
    }

    // 如果当前版本小于整包版本, 则需要整包升级
    if (this.judgeIsNeedUpdate(currentVersion, opt.pkgVersion)) {
      options.url = opt.pkgUrl
      options.version = opt.pkgVersion
      options.type = 'pkg'
    } else {
      // 如果不需要整包升级
      options.url = opt.wgtUrl
      options.version = opt.wgtVersion
      options.type = 'wgt'
    }

    const ext = options.url.split('.').pop()
    if (ext === 'wgt') {
      options.type === 'wgt'
    } else {
      options.type === 'pkg'
    }
    return options
  },
}

// 检测是否需要更新
// cb callback(true || false || 'msg', { android, ios })
export const checkUpdate = async (cb, fail = noop) => {
  try {
    const currentVersion = await tools.getCurrentVersion()
    const { status, data } = await tools.getServerVersion({
      version: currentVersion,
      platform: plus.os.name.toLowerCase(),
    })
    if (status === 1) {
      const options = tools.getOptions(data, currentVersion)
      const isUpdate = tools.judgeIsNeedUpdate(currentVersion, options.version) && !!options.url
      cb(isUpdate, options)
    } else {
      cb(false)
    }
  } catch (e) {
    console.log(e)
    fail(e)
  }
}

export default {
  namespaced: true,
  state: {
    option: {
      url: '',
      message: '',
      version: '',
    },
    needUpgrade: false,
    // 下载百分比
    downPercent: 0,
    downloading: false,
  },
  mutations: {
    CHANGE_DOWNLOADING(state, bol) {
      state.downloading = bol
    },
    CHANGE_PERCENT(state, percent) {
      state.downPercent = percent
    },
  },
  actions: {
    /**
     * 检查是否有更新
     * 模式: 私下检查、主动检查
     * @param {*} param0
     * @param {*} param1
     */
    check({ commit, state }) {
      return new Promise((resolve, reject) => {
        // #ifdef APP-PLUS
        checkUpdate((isUpdate, options) => {
          // 是否发生改变
          let isChange = state.needUpgrade !== isUpdate
          state.needUpgrade = isUpdate
          state.option = {
            ...options,
          }
          const toUpgrade = () => {
            uni.navigateTo({
              url: '/pages/basic/upgrade',
            })
          }
          resolve({ isUpdate, isChange, toUpgrade })
        })
        // #endif
        // #ifndef APP-PLUS
        reject({ message: '非APP端不可更新' })
        // #endif
      })
    },
  },
}
