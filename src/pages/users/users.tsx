import Taro, { pxTransform, useEffect, } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ClButton, ClText, ClIcon } from 'mp-colorui'
import { useDispatch, useSelector } from '@tarojs/redux'
import { GET_USERS } from '../../constants'
import './users.scss'

type State = {
  users: {
    users: [{
      avatar: string
      nickName: string
      _id: string
      updateAt: Date
    }]
  }
}

export default function Users() {
  const dispatch = useDispatch()
  const users = useSelector((state: State) => state.users.users)
  console.log('%cAT-users: ', 'color: #bf2c9f; background: pink; font-size: 13px;', users);

  useEffect(() => {
    async function getUsers() {
      try {
        dispatch({
          type: GET_USERS,
        })
      } catch (err) { console.log('getUsers ERR -> pages/users', err) }
    }
    if (!users.length) {
      getUsers();
    }
  }, [users, dispatch])

  return (
    <View className='list'>
      <View className='item'>
        <View className='content'>
          <ClText textColor='gray' align='left'>序号：1</ClText>
          <View style={{ width: pxTransform(500) }}>
            <ClText textColor='brown' cut align='left'>昵称：泰泰国、新加坡、印度尼西亚泰国、新加坡、印度尼西亚泰国、新加坡、印度尼西亚泰国、新加坡、印度尼西亚国、新加坡、印度尼西亚~ </ClText>
          </View>
        </View>
        <View className='btn'>
          <ClButton shape='radius' bgColor='grey'>
            <ClIcon iconName='edit' size='small' color='white' />
          </ClButton>
        </View>
      </View>
    </View>
  )
}
Users.config = {
  navigationBarTitleText: '用户列表',
}