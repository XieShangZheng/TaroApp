import Taro, { useState } from '@tarojs/taro'
import { Button } from '@tarojs/components';
import { useDispatch } from '@tarojs/redux';
import { SET_LOGIN_INFO } from '../../constants';

import './index.scss'

export default function LoginButton() {
  const [isLogin, setIsLogin] = useState(false)
  const dispatch = useDispatch();
  async function onGetUserInfo(e) {
    setIsLogin(true)

    const { avatarUrl, nickName } = e.detail.userInfo

    dispatch({
      type: SET_LOGIN_INFO,
      payload: {
        avatar: avatarUrl,
        nickName,
      }
    })

    try {
      Taro.setStorage({
        key: 'userInfo',
        data: { avatar: avatarUrl, nickName }
      })
    } catch (err) {
      console.log('setStorage ERR: ', err);
    }
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