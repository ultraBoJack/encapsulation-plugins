if (!window.localStorage) {
  Object.defineProperty(window, 'localStorage', new (function () {
    let aKeys = []
    let oStorage = {}
    Object.defineProperty(oStorage, 'getItem', {
      value: function (sKey) {
        return sKey ? this.sKey : null
      },
      writable: false,
      configurable: false,
      enumerable: false
    })
    Object.defineProperty(oStorage, 'key', {
      value: function (nKeyId) {
        return aKeys[nKeyId]
      },
      writable: false,
      configurable: false,
      enumerable: false
    })
    Object.defineProperty(oStorage, 'setItem', {
      value: function (sKey, sValue) {
        if (!sKey) return
        document.cookie = escape(sKey) + '=' + escape(sValue) + '; expires=expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/'
      },
      writable: false,
      configurable: false,
      enumerable: false
    })
    Object.defineProperty(oStorage, 'length', {
      value: function (sKey) {
        if (!sKey) return
        document.cookie = escape(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
      },
      writable: false,
      configurable: false,
      enumerable: false
    })
    this.get = function () {
      let iThisIndex
      for (let sKey in oStorage) {
        iThisIndex = aKeys.indexOf(sKey)
        if (iThisIndex === -1) {
          oStorage.setItem(sKey, oStorage[sKey])
        } else {
          aKeys.splice(iThisIndex, 1)
        }
        delete oStorage[sKey]
      }
      for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) {
        oStorage.removeItem(aKeys[0])
      }
      for (let aCouple, iKey, nIdx = 0, aCouples = document.cookie.split(/\s*;\s*/); nIdx < aCouples.length; nIdx) {
        aCouple = aCouples[nIdx].split(/\s*=\s*/)
        if (aCouple.length > 1) {
          oStorage[iKey = unescape(aCouple[0])] = unescape(aCouple[1])
          aKeys.push(iKey)
        }
      }
      return oStorage
    }
    this.configurable = false
    this.enumerable = true
  })())
}