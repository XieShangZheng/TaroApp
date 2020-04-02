import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.scss';

interface Props {
	title: string
	content: string
}

export default function PostCard(props: Props) {
	return (
		<View className='postcard'>
			<View className='post-title'>{props.title}</View>
			<View className='post-content'>{props.content}</View>
		</View>
	)
}
