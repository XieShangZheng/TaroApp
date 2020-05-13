import Taro, { pxTransform, useEffect, } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ClButton, ClText, ClIcon, ClAvatar } from 'mp-colorui'
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
    try {
      dispatch({
        type: GET_USERS,
      })
    } catch (err) { console.log('getUsers ERR -> pages/users', err) }
  }, [])

  const onImageClick = (avatar) => {
    Taro.previewImage({
      urls: [avatar],
    })
  }

  return (
    <View className='list'>
      {
        users.length && users.map((item, index): any => {
          return (
            <View className='item' key={item._id}>
              <View className='angle'>{index}</View>

              {item.avatar && (
                <ClAvatar headerArray={[{ url: item.avatar, bgColor: 'light-green' }]} shape='round' onClick={() => onImageClick(item.avatar)} />
              )}

              <View className='name' style={{ width: pxTransform(500) }}>
                <ClText textColor='brown' cut align='left'>{item.nickName}</ClText>
              </View>
              <View className='btn'>
                <ClButton size='small' plain shape='round' shadow bgColor='green' plainSize='bold' >操作</ClButton>
              </View>
            </View>
          )
        })
      }
    </View>
  )
}
Users.config = {
  navigationBarTitleText: '用户列表',
}