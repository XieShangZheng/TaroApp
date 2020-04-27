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
    dispatch({
      type: GET_POST,
      payload: {
        postId,
      },
    })

    return () => {
      dispatch({ type: SET_POST, payload: { post: {} } })
    }
  }, [])

  return (
    <View className='post'>
      <PostCard post={post}></PostCard>
    </View>
  )
}

Post.config = {
  navigationBarTitleText: '帖子详情'
}