import Taro, { useEffect, useDidHide } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'
import { AtFab, AtFloatLayout, AtMessage } from 'taro-ui'
import {
  SET_POST_FORM_IS_OPENED,
  SET_LOGIN_INFO,
  GET_POSTS,
  LOGIN_SUCCESS,
} from '../../constants'

import { PostCard, PostForm } from '../../components'
import './index.scss'

interface State {
  post: {
    posts: [{
      title: string
      content: string
      id: string
    }]
    isOpened: boolean
    isPosts: boolean
  }
}
interface User {
  user: {
    loginStatus: string
    roles: string[]
  }
}
export default function Index() {
  const isOpened = useSelector((state: State) => state.post.isOpened)
  const posts = useSelector((state: State) => state.post.posts) || []
  const loginStatus = useSelector((state: User) => state.user.loginStatus)
  const roles = useSelector((state: User) => state.user.roles)
  const isPosts = useSelector((state: State) => state.post.isPosts)
  const isLogged = loginStatus === LOGIN_SUCCESS;
  const dispatch = useDispatch();

  useEffect(() => {
    isPosts && Taro.showLoading({ title: '加载中' })
    !isPosts && Taro.hideLoading();
  }, [isPosts])

  useEffect(() => {
    async function getStorage() {
      try {
        const { data } = await Taro.getStorage({ key: 'userInfo' })
        dispatch({
          type: SET_LOGIN_INFO,
          payload:
          {
            ...data,
            userId: data._id,
            loginStatus: LOGIN_SUCCESS,
          }
        })
      } catch (err) {
        console.log('getStorage ERR-index: ', err)
      }
    }
    if (!isLogged) {
      getStorage();
    }
  }, [isLogged, dispatch])

  useEffect(() => {
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

    if (!posts.length) {
      getPosts()
    }
  }, [posts, dispatch])

  const setIsOpened = state => {
    dispatch({
      type: SET_POST_FORM_IS_OPENED,
      payload: { isOpened: state },
    })
  }

  const handleClickEdit = () => {
    if (isLogged) {
      setIsOpened(true)
    }
  }

  useDidHide(() => {
    if (isOpened) {
      setIsOpened(false);
    }
  })

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
      {
        roles.includes('0') &&
        <View className='post-button'>
          <AtFab onClick={() => handleClickEdit()}>
            <Text className='at-fab__icon at-icon at-icon-edit'></Text>
          </AtFab>
        </View>
      }
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '表白墙',
}
