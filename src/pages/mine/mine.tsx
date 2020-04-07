import Taro, { useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useDispatch } from '@tarojs/redux';

import { SET_LOGIN_INFO } from '../../constants';
import { Header, Footer } from '../../components'
import './mine.scss'

export default function Mine() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getStorage() {
      try {
        const { data } = await Taro.getStorage({ key: 'userInfo' })

        const { nickName: asNickName, avatar: asAvatar } = data

        // 更新 Redux Store 数据
        dispatch({ type: SET_LOGIN_INFO, payload: { nickName: asNickName, avatar: asAvatar } })
      } catch (err) {
        console.log('getStorage ERR: ', err)
      }
    }

    getStorage()
  }, [dispatch])

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