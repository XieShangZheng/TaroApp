import Taro, { pxTransform } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ClButton, ClText, ClIcon } from 'mp-colorui'
import './users.scss'

export default function Users() {
  return (
    <View className='list'>
      <View className='item'>
        <View className='content'>
          <ClText textColor='gray' align='left'>序号：1</ClText>
          <View style={{ width: pxTransform(500) }}>
            <ClText textColor='brown' cut align='left'>昵称：泰泰国、新加坡、印度尼西亚泰国、新加坡、印度尼西亚泰国、新加坡、印度尼西亚泰国、新加坡、印度尼西亚国、新加坡、印度尼西亚~ </ClText>
          </View>
        </View>
        <View className='btn'>
          <ClButton shape='radius' bgColor='grey'>
            <ClIcon iconName='edit' size='small' color='white' />
          </ClButton>
        </View>
      </View>
    </View>
  )
}
Users.config = {
  navigationBarTitleText: '用户列表',
}