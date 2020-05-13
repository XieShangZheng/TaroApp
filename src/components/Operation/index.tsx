import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ClButton, ClModal } from 'mp-colorui'
import { AtCheckbox } from 'taro-ui'

export default function Operation(data) {
  const [normal, setNormal] = useState(false)

  const checkboxOption = [{
    value: 'list1',
    label: 'iPhone X',
    desc: '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。'
  }, {
    value: 'list2',
    label: 'HUAWEI P20'
  }, {
    value: 'list3',
    label: 'OPPO Find X',
    desc: '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。',
    disabled: true
  }, {
    value: 'list4',
    label: 'vivo NEX',
    desc: '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。',
    disabled: true
  }]

  const [checkedList, setCheckedList] = useState(['list1'])
  const handleOp = () => {
    console.log('点击操作');
    const info = data.data;
    console.log('%cAT-info-/Users/at/code/company/TaroApp/src/components/Operation/index.tsx: ', 'color: #bf2c9f; background: pink; font-size: 13px;', info);
    setNormal(true)
  }

  const handleChange = (value) => {
    console.log('%cAT-value-/Users/at/code/company/TaroApp/src/components/Operation/index.tsx: ', 'color: #bf2c9f; background: pink; font-size: 13px;', value);
    setCheckedList(value)
  }

  return (
    <View className='btn'>
      <ClButton size='small' plain shape='round' shadow bgColor='green' plainSize='bold' onClick={handleOp}>操作</ClButton>
      <ClModal
        show={normal}
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
        onCancel={() => setNormal(false)}
        onClose={() => setNormal(false)}
        onClick={() => setNormal(false)}
      >
        <AtCheckbox
          options={checkboxOption}
          selectedList={checkedList}
          onChange={handleChange}
        ></AtCheckbox>
      </ClModal>
    </View>
  )
}