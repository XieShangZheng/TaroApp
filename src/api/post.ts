import Taro from '@tarojs/taro';

async function createPost(postData, userId) {
	const isWeApp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP;

	console.log('postData', postData, userId);

	// 针对微信小程序使用小程序云函数，其他使用小程序 RESTful API
	try {
		if (isWeApp) {
			const { result }: any = await Taro.cloud.callFunction({
				name: 'createPost',
				data: {
					postData,
					userId,
				},
			});

			return result.post;
		}
	} catch (err) {
		console.error('createPost ERR: ', err);
	}
}

const postApi = {
	createPost,
};
export default postApi;
