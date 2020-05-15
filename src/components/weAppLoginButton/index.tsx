import Taro from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { ClButton } from 'mp-colorui'

import './index.scss'
import { LOGIN } from '../../constants'

interface State {
  user: {
    isLogin: boolean
  }
}

export default function WeappLoginButton() {
  const isLogin = useSelector((state: State) => state.user.isLogin)
  const dispatch = useDispatch()

  function onGetUserInfo(e) {

    const { avatarUrl, nickName } = e.detail.userInfo
    const userInfo = { avatar: avatarUrl, nickName }

    dispatch({
      type: LOGIN,
      payload: {
        userInfo,
      },
    })

  }

  return (
    <ClButton
      openType='getUserInfo'
      onGetUserInfo={onGetUserInfo}
      plain
      loading={isLogin}
      long
      size='large'
      className='login-button'
      bgColor='mauve'
      shadow
    >微信登录</ClButton>
  )
}
