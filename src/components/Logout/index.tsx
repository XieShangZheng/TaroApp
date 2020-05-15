import Taro, { useState } from '@tarojs/taro'
import { useDispatch } from '@tarojs/redux'
import { ClButton } from 'mp-colorui'

import { SET_LOGIN_OUT } from '../../constants'

export default function LogoutButton() {
  const [isLogout, setIsLogout] = useState(false)
  const dispatch = useDispatch()

  async function handleLogout() {
    setIsLogout(true)

    try {
      await Taro.removeStorage({ key: 'userInfo' })

      dispatch({
        type: SET_LOGIN_OUT,
      })
    } catch (err) {
      console.log('removeStorage ERR: ', err)
    }
    setIsLogout(false)
  }

  return (
    <ClButton plain shape='round' long shadow bgColor='green' size='large' loading={isLogout} onClick={handleLogout} >退出登录</ClButton>
  )
}
