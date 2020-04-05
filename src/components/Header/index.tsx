import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage } from 'taro-ui'

import LoggedMine from '../LoggedMine'
import WeappLoginButton from '../WeappLoginButton'

import './index.scss'

type userInfo = {
  avatar: string
  nickName?: string
  username?: string
}

interface Props {
  userInfo: userInfo
  isLogged: boolean
  setLoginInfo: (avatarUrl: string, nickName: string) => void
  handleClick?: () => void
}

export default function Header(props: Props) {
  const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP

  return (
    <View className='user-box'>
      <AtMessage />
      <LoggedMine userInfo={props.userInfo} />
      {!props.isLogged && (
        <View className='login-button-box'>
          {isWeapp && <WeappLoginButton setLoginInfo={props.setLoginInfo} />}
        </View>
      )}
    </View>
  )
}
