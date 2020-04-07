import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage } from 'taro-ui'
import { useSelector } from '@tarojs/redux'

import LoggedMine from '../LoggedMine'
import WeappLoginButton from '../WeappLoginButton'
import './index.scss'

type State = {
  user: {
    nickName: string
  }
}

export default function Header(props) {
  const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP

  const nickName = useSelector((state: State) => state.user.nickName)
  const isLogged = !!nickName;

  return (
    <View className='user-box'>
      <AtMessage />
      <LoggedMine />
      {!isLogged && (
        <View className='login-button-box'>
          {isWeapp && <WeappLoginButton />}
        </View>
      )}
    </View>
  )
}
