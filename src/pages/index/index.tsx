import Taro, {  } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'
import { AtFab, AtFloatLayout, AtMessage } from 'taro-ui'
import { SET_POST_FORM_IS_OPENED } from '../../constants'

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
    }]
    isOpened: boolean
  }
}
export default function Index() {
  const isOpened = useSelector((state: State) => state.post.isOpened)
  const posts = useSelector((state: State) => state.post.posts)
  const dispatch = useDispatch();
  const setIsOpened = state => {
    dispatch({
      type: SET_POST_FORM_IS_OPENED,
      payload: { isOpened: state },
    })
  }
  return (
    <View className='index'>
      <AtMessage />
      {posts.map(post => (
        <PostCard
          key={post.title}
          title={post.title}
          content={post.content}
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
        <AtFab onClick={() => setIsOpened(true)} >
          <Text className='at-fab__icon at-icon at-icon-edit'></Text>
        </AtFab>
      </View>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '首页',
}
