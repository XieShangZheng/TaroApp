import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import Logout from '../Logout'
import './index.scss'

interface Props {
  handleLogout: () => void
  isLogged: boolean
  isLogout: boolean
}
export default function Footer(props: Props) {
  return (
    <View className='mine-footer'>
      {props.isLogged && (
        <Logout loading={props.isLogout} handleLogout={props.handleLogout} />
      )}
      <View className='tuture-motto'>
        {props.isLogged ? 'From 图雀社区 with Love ❤' : '您还未登录'}
      </View>
    </View>
  )
}
