import Taro, { useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useDispatch, useSelector } from '@tarojs/redux'
import { AtMessage } from 'taro-ui'

import { Header, Footer } from '../../components'
import './mine.scss'
import { SET_LOGIN_INFO, LOGIN_SUCCESS } from '../../constants'

interface State {
  user: {
    loginStatus: string
  }
}

export default function Mine() {
  const dispatch = useDispatch()
  const loginStatus = useSelector((state: State) => state.user.loginStatus)

  const isLogged = loginStatus === 'LOGIN_SUCCESS';

  useEffect(() => {
    async function getStorage() {
      try {
        const { data }: any = await Taro.getStorage({ key: 'userInfo' })

        // 更新 Redux Store 数据
        dispatch({
          type: SET_LOGIN_INFO,
          payload: {
            ...data,
            userId: data._id,
            loginStatus: LOGIN_SUCCESS,
          },
        })
      } catch (err) {
        console.log('getStorage ERR-mine: ', err)
      }
    }

    if (!isLogged) {
      getStorage()
    }
  }, [dispatch, isLogged])

  return (
    <View className='mine'>
      <AtMessage />
      <Header />
      <View className='footerWrap'>
        <Footer />
      </View>
    </View>
  )
}

Mine.config = {
  navigationBarTitleText: '我的',
}
