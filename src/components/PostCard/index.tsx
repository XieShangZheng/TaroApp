import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import classNames from 'classnames';

import './index.scss';

interface Props {
	title: string
	content: string
	isList?: boolean
}

export default function PostCard(props: Props) {
	const handleClick = () => {
		if (props.isList) {
			console.log('%cAT-props: ', 'color: #bf2c9f; background: pink; font-size: 13px;', props);
			const { title, content } = props
			Taro.navigateTo({
				url: `/pages/post/post?title=${title}&content=${content}`,
			})
		}
	}
	return (
		<View className={classNames('postcard', { 'postcard__isList': props.isList })} onClick={handleClick}>
			<View className='post-title'>{props.title}</View>
			<View className='post-content'>{props.content}</View>
		</View>
	)
}

PostCard.defaultProps = {
	isList: '',
}