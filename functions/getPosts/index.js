// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { postId } = event
  console.log('%cAT-postId: ', 'color: #bf2c9f; background: pink; font-size: 13px;', postId);

  try {
    const { data } = await db
      .collection('post')
      .doc(postId)
      .get()

    return {
      post: data,
    }
  } catch (e) {
    console.error(`getPost ERR: ${e}`)
  }
}
