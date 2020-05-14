import Taro, { useState } from '@tarojs/taro'
import { useDispatch } from '@tarojs/redux'
import { isEqual, isEmpty } from 'lodash'
import { View } from '@tarojs/components'
import { ClButton, ClModal } from 'mp-colorui'
import { AtCheckbox, AtMessage } from 'taro-ui'
import { ROLES, UPDATE_USER } from '../../constants'

export default function Operation(props) {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false)
  const [checkedList, setCheckedList] = useState([])

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
          console.log(`updateUser ERR -> Operation/handleConfirm ${err}`);
        }
      }
    }
    handleClose()
  }

  return (
    <View className='btn'>
      <ClButton size='small' plain shape='round' shadow bgColor='green' plainSize='bold' onClick={handleOp}>操作</ClButton>
      <ClModal
        show={isShow}
        closeWithShadow
        title='权限设置'
        close
        actions={[
          {
            text: '取消',
            color: 'black'
          },
          {
            text: '确认',
            color: 'green'
          }
        ]}
        onCancel={handleClose}
        onClose={handleClose}
        onClick={handleConfirm}
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