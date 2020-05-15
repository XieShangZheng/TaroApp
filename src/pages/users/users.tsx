import Taro, { pxTransform, useEffect, useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ClText, ClAvatar, ClModal, ClTitleBar, ClLayout, ClFlex, ClButton } from 'mp-colorui'
import { useDispatch, useSelector } from '@tarojs/redux'
import { AtMessage, AtCheckbox } from 'taro-ui'
import { isEqual, isEmpty } from 'lodash'
import { ReactNode } from 'react'
import { GET_USERS, ROLES, UPDATE_USER } from '../../constants'

import './users.scss'

interface User {
  avatar: string
  nickName: string
  _id: string
  updateAt: Date
  roles: []
  isUser: boolean
}

type Users = {
  users: {
    users: [User]
    isUsers: boolean
  }
}

interface UpdateUser {
  user: User
}

export default function Users() {
  const dispatch = useDispatch()
  const users = useSelector((state: Users) => state.users.users)
  const isUsers = useSelector((state: Users) => state.users.isUsers)
  const [isShow, setIsShow] = useState(false)
  const [checkedList, setCheckedList] = useState([])
  const isUser = useSelector((state: UpdateUser) => state.user.isUser)
  const [userInfo, setUserInfo] = useState({ _id: '', roles: [], nickName: '', })

  useEffect(() => {
    isUsers && Taro.showLoading({ title: '加载中' })
    !isUsers && Taro.hideLoading();
  }, [isUsers])

  useEffect(() => {
    try {
      dispatch({
        type: GET_USERS,
      })
    } catch (err) {
      console.log('getUsers ERR -> pages/users', err)
    }
  }, [dispatch])

  const onImageClick = (avatar) => {
    Taro.previewImage({
      urls: [avatar],
    })
  }

  const handleOp = (user) => {
    const roles = user.roles ? user.roles : [];
    setCheckedList(roles) // 权限勾选状态
    setIsShow(true) // 显示 modal
    setUserInfo(user) // 当前选中的用户信息
  }

  const handleChange = (value) => {
    setCheckedList(value)
  }

  const handleClose = () => {
    if (!isEmpty(checkedList)) {
      setCheckedList([])
    }
    setIsShow(false)
  }

  const handleConfirm = index => {
    if (index) {
      const roles = userInfo.roles ? userInfo.roles : [];
      if (!isEqual(roles, checkedList)) {
        // 修改权限后进行更新
        try {
          // 更新用户权限
          dispatch({
            type: UPDATE_USER,
            payload: {
              userData: { roles: checkedList },
              userId: userInfo._id,
            }
          })
        } catch (err) {
          throw new Error(`updateUser ERR -> handleConfirm ${err}`)
        }
      }
    }
    handleClose()
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
              <ClButton size='small' plain shape='round' shadow bgColor='green' plainSize='bold' onClick={() => handleOp(item)}>操作</ClButton>
            </View>
          )
        })
      }
      <ClModal
        show={isShow}
        closeWithShadow
        close
        custom
        onCancel={handleClose}
        renderTitle={
          <ClTitleBar
            title='权限操作'
            textColor='black'
            type='sub-title'
            subTitle={userInfo.nickName ? userInfo.nickName : ''}
            subTitleColor='cyan'
          />
        }
        renderAction={
          <ClLayout>
            <ClFlex justify='around'>
              <View className='flex-sub'>
                <ClButton
                  bgColor='gray'
                  long
                  size='large'
                  onClick={handleClose}
                >
                  取消
                </ClButton>
              </View>
              <View className='flex-sub'>
                <ClButton
                  bgColor='green'
                  long
                  size='large'
                  onClick={handleConfirm}
                  loading={isUser}
                >
                  确认
                </ClButton>
              </View>
            </ClFlex>
          </ClLayout>
        }
      >
        <AtCheckbox
          options={ROLES}
          selectedList={checkedList}
          onChange={handleChange}
        ></AtCheckbox>
      </ClModal>
      <AtMessage />
    </View>
  )
}
Users.config = {
  navigationBarTitleText: '用户列表',
}