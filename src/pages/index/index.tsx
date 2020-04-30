import Taro, { useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'
import { AtFab, AtFloatLayout, AtMessage } from 'taro-ui'
import {
  SET_POST_FORM_IS_OPENED,
  SET_LOGIN_INFO,
  GET_POSTS,
} from '../../constants'

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
    isPost: boolean
  }
  user: {
    nickName: string
  }
}
export default function Index() {
  const isOpened = useSelector((state: State) => state.post.isOpened)
  const posts = useSelector((state: State) => state.post.posts) || []
  const nickName = useSelector((state: State) => state.user.nickName)
  const isPost = useSelector((state: State) => state.post.isPost)
  const isLogged = !!nickName;
  const dispatch = useDispatch();

  useEffect(() => {
    isPost && Taro.showLoading({ title: '加载中' })
    !isPost && Taro.hideLoading();
  }, [isPost])

  useEffect(() => {
    async function getStorage() {
      try {
        const { data } = await Taro.getStorage({ key: 'userInfo' })
        dispatch({ type: SET_LOGIN_INFO, payload: { ...data, userId: data._id } })
      } catch (err) {
        console.log('getStorage ERR-index: ', err)
      }
    }
    if (!isLogged) {
      getStorage();
    }
    async function getPosts() {
      try {
        // 更新 Redux Store 数据
        dispatch({
          type: GET_POSTS,
        })
      } catch (err) {
        console.log('getPosts ERR: ', err)
      }
    }

    if (posts && !posts.length) {
      getPosts()
    }
  }, [])

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
      {posts.map((post: any) => (
        <PostCard key={post._id} postId={post._id} post={post} isList />
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
