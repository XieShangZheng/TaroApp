import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ClButton, ClModal } from 'mp-colorui'
import { AtCheckbox, AtMessage } from 'taro-ui'
import { isEqual, isEmpty } from 'lodash'
import { ROLES } from '../../constants'

export default function Operation(data) {
  const [isShow, setIsShow] = useState(false)
  const [checkedList, setCheckedList] = useState([])

  const handleOp = () => {
    const info = data.data;
    const roles = info.roles ? info.roles : [];
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
      const info = data.data;
      const roles = info.roles ? info.roles : [];
      if (!isEqual(roles, checkedList)) {
        return;
      }

      // 调用接口更新用户权限
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