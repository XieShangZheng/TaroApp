import Taro, { useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'
import { AtFab, AtFloatLayout, AtMessage } from 'taro-ui'
import { SET_POST_FORM_IS_OPENED, SET_LOGIN_INFO } from '../../constants'

import { PostCard, PostForm } from '../../components'
import './index.scss'

interface State {
  post: {
    posts: [{
      title: string
      content: string
      user: {
        nickName: string
        avatar: string
      }
      id: string
    }]
    isOpened: boolean
  }
  user: {
    nickName: string
  }
}
export default function Index() {
  const isOpened = useSelector((state: State) => state.post.isOpened)
  const posts = useSelector((state: State) => state.post.posts) || []
  const nickName = useSelector((state: State) => state.user.nickName)
  const isLogged = !!nickName;
  const dispatch = useDispatch();

  useEffect(() => {
    async function getStorage() {
      try {
        const { data } = await Taro.getStorage({ key: 'userInfo' })
        const { nickName: asNickName, avatar: asAvatar } = data;
        dispatch({ type: SET_LOGIN_INFO, payload: { nickName: asNickName, avatar: asAvatar } })
      } catch (err) {
        console.log('getStorage ERR: ', err)
      }
    }
    getStorage();
  })

  const setIsOpened = state => {
    dispatch({
      type: SET_POST_FORM_IS_OPENED,
      payload: { isOpened: state },
    })
  }

  const handleClickEdit = () => {
    if (!isLogged) {
      Taro.atMessage({
        type: 'warning',
        message: '您还未登录哦！',
      })
    } else {
      setIsOpened(true)
    }
  }

  return (
    <View className='index'>
      <AtMessage />
      {posts.map(post => (
        <PostCard
          key={post.title}
          post={post}
          isList
        />
      ))}
      <AtFloatLayout
        isOpened={isOpened}
        title='发表新文章'
        onClose={() => setIsOpened(false)}
      >
        <PostForm />
      </AtFloatLayout>
      <View className='post-button'>
        <AtFab onClick={() => handleClickEdit()}>
          <Text className='at-fab__icon at-icon at-icon-edit'></Text>
        </AtFab>
      </View>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '首页',
}
