import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'

import Logout from '../Logout'
import './index.scss'

type State = {
  user: {
    nickName: string
  }
}

export default function Footer() {
  const nickName = useSelector((state: State) => state.user.nickName)
  // 双取反来构造字符串对应的布尔值，用于标志此时是否用户已经登录
  const isLogged = !!nickName

  return (
    <View className='mine-footer'>
      {isLogged && (
        <Logout />
      )}
      <View className='tuture-motto'>
        {isLogged ? 'From 图雀社区 with Love ❤' : '您还未登录'}
      </View>
    </View>
  )
}