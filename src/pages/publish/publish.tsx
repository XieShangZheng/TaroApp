import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ClTextarea, ClLayout, ClButton } from 'mp-colorui'
import './publish.scss'

export default function Publish() {
  const [height, setHeight] = useState(400)
  const onLineChange = event => {
    const { heightRpx, lineCount } = event;
    setHeight(heightRpx)

    if (heightRpx < 400 || !lineCount) {
      setHeight(400)
    }
  }
  return (
    <ClLayout margin='small'>
      <View className='textareaWrap'>
        <ClTextarea
          showLengthTip
          height={height}
          bgColor='white'
          placeholder='请输入...'
          autoFocus
          showConfirmBar
          onLineChange={onLineChange}
        />
        <View className='footer'>
          <View className='picBtn'>+ 添加图片（最多9张）</View>
          <View className='release'>
            <ClButton bgColor='white' shadow={false} >确认发布</ClButton>
          </View>
        </View>
      </View>
    </ClLayout>
  )
}
Publish.config = {
  navigationBarTitleText: '发布'
}