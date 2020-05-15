import Taro, { pxTransform, useEffect, } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ClText, ClAvatar } from 'mp-colorui'
import { useDispatch, useSelector } from '@tarojs/redux'
import { ReactNode } from 'react'
import { Operation } from '../../components'
import { GET_USERS } from '../../constants'
import './users.scss'

interface User {
  avatar: string
  nickName: string
  _id: string
  updateAt: Date
  roles: []
}

type State = {
  users: {
    users: [User]
    isUsers: boolean
  }
}


export default function Users() {
  const dispatch = useDispatch()
  const users = useSelector((state: State) => state.users.users)
  const isUsers = useSelector((state: State) => state.users.isUsers)

  useEffect(() => {
    isUsers && Taro.showLoading({ title: '加载中' })
    !isUsers && Taro.hideLoading();
  }, [isUsers])

  useEffect(() => {
    try {
      dispatch({
        type: GET_USERS,
      })
    } catch (err) { console.log('getUsers ERR -> pages/users', err) }
  }, [dispatch])

  const onImageClick = (avatar) => {
    Taro.previewImage({
      urls: [avatar],
    })
  }

  return (
    <View className='list'>
      {
        users.length && users.map((item: User, index): ReactNode => {
          return (
            <View className='item' key={item._id}>
              <View className='angle'>{index}</View>

              {item.avatar && (
                <ClAvatar headerArray={[{ url: item.avatar, bgColor: 'light-green' }]} shape='round' onClick={() => onImageClick(item.avatar)} />
              )}

              <View className='name' style={{ width: pxTransform(500) }}>
                <ClText textColor='brown' cut align='left'>{item.nickName}</ClText>
              </View>
              <Operation userInfo={item} />
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