import Taro, { useRouter, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux';

import { PostCard, } from '../../components'
import { GET_POST, SET_POST } from '../../constants'
import './post.scss'

type State = {
  post: {
    post: {}
  }
}

export default function Post() {
  const router = useRouter();
  const { postId } = router.params;

  const dispatch = useDispatch()
  const post = useSelector((state: State) => state.post.post)

  useEffect(() => {
    Taro.showLoading({ title: '加载中' });
    dispatch({
      type: GET_POST,
      payload: {
        postId,
      },
    })
    Taro.hideLoading();

    return () => {
      dispatch({ type: SET_POST, payload: { post: {} } })
    }
  }, [dispatch, postId])

  return (
    <View className='post'>
      <PostCard post={post}></PostCard>
    </View>
  )
}

Post.config = {
  navigationBarTitleText: '帖子详情'
}