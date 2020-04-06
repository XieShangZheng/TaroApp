import Taro, { useState } from '@tarojs/taro'
import { Button } from '@tarojs/components';
import { useDispatch } from '@tarojs/redux';
import { SET_LOGIN_INFO } from '../../constants';

import './index.scss'

interface Props {
  setLoginInfo: (avatarUrl: string, nickName: string) => void
}

export default function LoginButton(props: Props) {
  const [isLogin, setIsLogin] = useState(false)
  const dispatch = useDispatch();
  async function onGetUserInfo(e) {
    setIsLogin(true)

    const { avatarUrl, nickName } = e.detail.userInfo
    await props.setLoginInfo(avatarUrl, nickName)

    dispatch({
      type: SET_LOGIN_INFO,
      payload: {
        avatar: avatarUrl,
        nickName,
      }
    })
    setIsLogin(false)
  }

  return (
    <Button
      openType='getUserInfo'
      onGetUserInfo={onGetUserInfo}
      type='primary'
      className='login-button'
      loading={isLogin}
    >
      微信登录
    </Button>
  )
}
