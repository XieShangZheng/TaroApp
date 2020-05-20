import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ClTextarea, ClLayout, ClButton } from 'mp-colorui'
import { useDispatch, useSelector } from '@tarojs/redux'
import { CREATE_POST } from '@/constants/index'
import { AtMessage } from 'taro-ui'

import './publish.scss'

interface State {
  user: {
    userId: string
  }
}
export default function Publish() {
  const [height, setHeight] = useState(400)
  const [content, setContent] = useState('')
  const userId = useSelector((state: State) => state.user.userId)
  const dispatch = useDispatch()

  const onLineChange = event => {
    const { heightRpx, lineCount } = event;
    setHeight(heightRpx)

    if (heightRpx < 400 || !lineCount) {
      setHeight(400)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!userId) {
      Taro.atMessage({
        message: '请先登录',
        type: 'warning'
      })
      return
    }
    if (!content) {
      Taro.atMessage({
        message: '您还有内容没有填写完哦',
        type: 'warning',
      })
      return
    }
    dispatch({
      type: CREATE_POST,
      payload: {
        postData: {
          content,
        },
        userId,
      },
    })
    setContent('')
    Taro.switchTab({ url: '/pages/index/index' })
  }

  return (
    <ClLayout margin='small'>
      <AtMessage />
      <View className='textareaWrap'>
        <ClTextarea
          showLengthTip
          height={height}
          bgColor='white'
          placeholder='请输入...'
          autoFocus
          showConfirmBar
          onLineChange={onLineChange}
          onChange={value => setContent(value)}
        />
        <View className='footer'>
          <View className='picBtn'>+ 添加图片（最多9张）</View>
          <View className='release'>
            <ClButton bgColor='white' shadow={false} onClick={handleSubmit} >确认发布</ClButton>
          </View>
        </View>
      </View>
    </ClLayout>
  )
}
Publish.config = {
  navigationBarTitleText: '发布'
}