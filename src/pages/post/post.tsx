import Taro, { useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector } from '@tarojs/redux';
import _ from 'lodash'

import { PostCard } from '../../components'
import './post.scss'

type State = {
  post: {
    posts: object
  }
}

export default function Post() {
  const router = useRouter();
  const { postId } = router.params;

  const posts = useSelector((state: State) => state.post.posts)
  const post = _.find(posts, ['id', postId])
  return (
    <View className='post'>
      <PostCard post={post}></PostCard>
    </View>
  )
}

Post.config = {
  navigationBarTitleText: '帖子详情'
}