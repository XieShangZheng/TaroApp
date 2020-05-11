import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'
import { AtAvatar } from 'taro-ui';

import './index.scss'

type Props = {
  user: {
    nickName: string
    avatar: string
  }
}

export default function LoggedMine() {
  const nickName = useSelector((state: Props) => state.user.nickName)
  const avatar = useSelector((state: Props) => state.user.avatar)

  function onImageClick() {
    Taro.previewImage({
      urls: [avatar],
    })
  }

  return (
    <View className='logged-mine'>
      {avatar ? (
        <Image src={avatar} className='mine-avatar' onClick={onImageClick} />
      ) : (
          <AtAvatar size='large' circle text='墙' />
        )}

      <View className='mine-username'>{nickName}</View>
    </View>
  )
}