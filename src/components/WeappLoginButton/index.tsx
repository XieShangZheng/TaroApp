import Taro, { useState } from '@tarojs/taro'
import { useDispatch } from '@tarojs/redux'
import { AtButton } from 'taro-ui'

import './index.scss'
import { LOGIN } from '../../constants'

export default function WeappLoginButton() {
  const [isLogin, setIsLogin] = useState(false)

  const dispatch = useDispatch()

  async function onGetUserInfo(e) {
    setIsLogin(true)

    const { avatarUrl, nickName } = e.detail.userInfo
    const userInfo = { avatar: avatarUrl, nickName }

    dispatch({
      type: LOGIN,
      payload: {
        userInfo: userInfo,
      },
    })

    setIsLogin(false)
  }

  return (
    <AtButton
      openType='getUserInfo'
      onGetUserInfo={onGetUserInfo}
      type='primary'
      className='login-button'
      loading={isLogin}
    >
      微信登录
    </AtButton>
  )
}
