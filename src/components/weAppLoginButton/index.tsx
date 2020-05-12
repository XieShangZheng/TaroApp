import Taro from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { AtButton } from 'taro-ui'

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

  async function onGetUserInfo(e) {

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
    <AtButton
      openType='getUserInfo'
      onGetUserInfo={onGetUserInfo}
      type='secondary'
      className='login-button'
      loading={isLogin}
    >
      微信登录
    </AtButton>
  )
}
