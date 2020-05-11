import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'

import LoggedMine from '../LoggedMine'
import WeAppLoginButton from '../WeAppLoginButton'
import './index.scss'

type State = {
  user: {
    loginStatus: string
  }
}

export default function Header() {
  const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP
  const loginStatus = useSelector((state: State) => state.user.loginStatus)
  const isLogged = loginStatus === 'LOGIN_SUCCESS';

  return (
    <View className='user-box'>
      <LoggedMine />
      {!isLogged && (
        <View className='login-button-box'>
          {isWeapp && <WeAppLoginButton />}
        </View>
      )}
    </View>
  )
}
