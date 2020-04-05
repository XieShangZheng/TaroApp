import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import PropTypes from 'prop-types'

import './index.scss'
import avatar from '../../images/avatar.png'

type Props = {
  userInfo: {
    avatar: string
    nickName?: string
    username?: string
  }
}

export default function LoggedMine(props: Props) {
  const { userInfo } = props
  function onImageClick() {
    Taro.previewImage({
      urls: [userInfo.avatar],
    })
  }

  return (
    <View className='logged-mine'>
      <Image
        src={userInfo.avatar ? userInfo.avatar : avatar}
        className='mine-avatar'
        onClick={onImageClick}
      />
      <View className='mine-nickName'>
        {userInfo.nickName ? userInfo.nickName : '图雀酱'}
      </View>
      <View className='mine-username'>{userInfo.username}</View>
    </View>
  )
}

LoggedMine.propTypes = {
  avatar: PropTypes.string,
  nickName: PropTypes.string,
  username: PropTypes.string,
}
