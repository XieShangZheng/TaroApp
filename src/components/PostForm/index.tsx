import Taro, { useState } from '@tarojs/taro'
import { View, Form, Input, Textarea } from '@tarojs/components'
import { useDispatch, useSelector } from '@tarojs/redux'
import { ClButton } from 'mp-colorui'

import './index.scss'
import { CREATE_POST } from '../../constants'

interface State {
  user: {
    userId: string
  }
}

export default function PostForm() {
  const [formTitle, setFormTitle] = useState('')
  const [formContent, setFormContent] = useState('')
  const userId = useSelector((state: State) => state.user.userId)

  const dispatch = useDispatch()

  async function handleSubmit(e) {
    e.preventDefault()

    if (!formTitle || !formContent) {
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
          title: formTitle,
          content: formContent,
        },
        userId,
      },
    })

    setFormTitle('')
    setFormContent('')
  }

  return (
    <View className='post-form'>
      <View>
        <View className='form-hint'>标题</View>
        <Input
          className='input-title'
          type='text'
          placeholder='点击输入标题'
          value={formTitle}
          onInput={e => setFormTitle(e.detail.value)}
        />
        <View className='form-hint'>正文</View>
        <Textarea
          placeholder='点击输入正文'
          className='input-content'
          value={formContent}
          onInput={e => setFormContent(e.detail.value)}
        />
        <ClButton onClick={handleSubmit} size='large' plain shadow long bgColor='green' >提交</ClButton>
      </View>
    </View>
  )
}
