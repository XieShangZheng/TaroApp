import Taro, { useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useDispatch, useSelector } from '@tarojs/redux'

import { Header, Footer } from '../../components'
import './mine.scss'
import { SET_LOGIN_INFO } from '../../constants'

interface State {
  user: {
    nickName: string
  }
}

export default function Mine() {
  const dispatch = useDispatch()
  const nickName = useSelector((state: State) => state.user.nickName)

  const isLogged = !!nickName

  useEffect(() => {
    async function getStorage() {
      try {
        const { data } = await Taro.getStorage({ key: 'userInfo' })

        const { nickName: asNickName, avatar, _id } = data

        // 更新 Redux Store 数据
        dispatch({
          type: SET_LOGIN_INFO,
          payload: { nickName: asNickName, avatar, userId: _id },
        })
      } catch (err) {
        console.log('getStorage ERR-mine: ', err)
      }
    }

    if (!isLogged) {
      getStorage()
    }
  },[dispatch, isLogged])

  return (
    <View className='mine'>
      <Header />
      <Footer />
    </View>
  )
}

Mine.config = {
  navigationBarTitleText: '我的',
}
