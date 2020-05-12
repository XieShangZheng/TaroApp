import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ClMenuList } from 'mp-colorui'
import './index.scss'

export default function List() {
  const typeMenu = [
    { title: '用户列表', arrow: true },
  ]
  return (
    <View className='menu'>
      <ClMenuList card list={typeMenu} />
    </View>
  )
}