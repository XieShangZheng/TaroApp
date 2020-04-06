import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useDispatch } from '@tarojs/redux'
import { SET_LOGIN_OUT } from '../../constants'

import { Header, Footer } from '../../components'
import './mine.scss'

export default function Mine() {
  const [nickName, setNickName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [isLogout, setIsLogout] = useState(false)

  const dispatch = useDispatch();
  // 双取反来构造字符串对应的布尔值，用于标志此时是否用户已经登录
  const isLogged = !!nickName

  useEffect(() => {
    async function getStorage() {
      try {
        const { data } = await Taro.getStorage({ key: 'userInfo' })

        const { nickName: asNickName, avatar: asAvatar } = data
        setAvatar(asAvatar)
        setNickName(asNickName)
      } catch (err) {
        console.log('getStorage ERR: ', err)
      }
    }

    getStorage()
  }, [])

  async function setLoginInfo(asAvatar: string, asNickName: string) {
    setAvatar(asAvatar)
    setNickName(asNickName)
    try {
      await Taro.setStorage({
        key: 'userInfo',
        data: { asAvatar, asNickName },
      })
    } catch (err) {
      console.log('setStorage ERR: ', err)
    }
  }

  async function handleLogout() {
    setIsLogout(true)

    try {
      await Taro.removeStorage({ key: 'userInfo' })


      setAvatar('')
      setNickName('')
      dispatch({
        type: SET_LOGIN_OUT,
        payload: {
          nickName: '',
          avatar: '',
        }
      })
    } catch (err) {
      console.log('removeStorage ERR: ', err)
    }

    setIsLogout(false)
  }

  return (
    <View className='mine'>
      <Header
        isLogged={isLogged}
        userInfo={{ avatar, nickName }}
        setLoginInfo={setLoginInfo}
      />
      <Footer
        isLogged={isLogged}
        isLogout={isLogout}
        handleLogout={handleLogout}
      />
    </View>
  )
}

Mine.config = {
  navigationBarTitleText: '我的',
}