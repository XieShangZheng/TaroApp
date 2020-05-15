import Taro, { useState } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { isEqual, isEmpty } from 'lodash'
import { View } from '@tarojs/components'
import { ClButton, ClModal, ClTitleBar, ClLayout, ClFlex } from 'mp-colorui'
import { AtCheckbox, AtMessage } from 'taro-ui'
import { ROLES, UPDATE_USER } from '../../constants'
import './index.scss'

interface State {
  user: {
    isUser: boolean
  }
}
interface Props {
  userInfo: {
    roles: []
    _id: string
    nickName: string
  }
}
export default function Operation(props: Props) {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false)
  const [checkedList, setCheckedList] = useState([])
  const isUser = useSelector((state: State) => state.user.isUser)

  const handleOp = () => {
    const { userInfo } = props;
    const roles = userInfo.roles ? userInfo.roles : [];
    setCheckedList(roles)
    setIsShow(true)
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
      const { userInfo } = props;
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
          throw new Error(`updateUser ERR -> Operation/handleConfirm ${err}`)
        }
      }
    }
    handleClose()
  }

  return (
    <View className='btn'>
      <ClButton size='small' plain shape='round' shadow bgColor='green' plainSize='bold' onClick={handleOp}>操作</ClButton>

      {
        !isEmpty(props) &&
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
              subTitle={props.userInfo.nickName ? props.userInfo.nickName : ''}
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
      }
      <AtMessage />
    </View>
  )
}

// Operation.defaultProps = {
//   userInfo: {
//     avatar: '',
//     createdAt: '',
//     nickName: '',
//     roles: [],
//     updatedAt: '',
//     _id: '',
//   }
// }