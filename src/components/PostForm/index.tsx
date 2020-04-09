import Taro, { useState } from '@tarojs/taro'
import { View, Form, Input, Textarea } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { useDispatch, useSelector } from '@tarojs/redux'

import './index.scss'
import { SET_POSTS, SET_POST_FORM_IS_OPENED } from '../../constants'

interface State {
  user: {
    nickName: string
    avatar: string
  }
}

export default function PostForm() {
  const [formTitle, setFormTitle] = useState('')
  const [formContent, setFormContent] = useState('')
  const nickName = useSelector((state: State) => state.user.nickName)
  const avatar = useSelector((state: State) => state.user.avatar)

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
      type: SET_POSTS,
      payload: {
        posts: {
          title: formTitle,
          content: formContent,
          user: { nickName, avatar },
          id: formTitle,
        },
      },
    })

    setFormTitle('')
    setFormContent('')

    dispatch({
      type: SET_POST_FORM_IS_OPENED,
      payload: { isOpened: false },
    })

    Taro.atMessage({
      message: '发表文章成功',
      type: 'success',
    })
  }

  return (
    <View className='post-form'>
      <Form onSubmit={handleSubmit}>
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
          <AtButton formType='submit' type='primary'>
            提交
          </AtButton>
        </View>
      </Form>
    </View>
  )
}
