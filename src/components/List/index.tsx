import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ClMenuList } from 'mp-colorui'
import './index.scss'

export default function List() {
  const typeMenu = [
    { title: '用户列表', arrow: true },
  ]

  const handleClick = event => {
    let url = '';

    if (!event) {
      // 用户列表 0
      url = `/pages/users/users`
    }

    Taro.navigateTo({
      url
    })
  }

  return (
    <View className='menu'>
      <ClMenuList onClick={handleClick} card list={typeMenu} />
    </View>
  )
}