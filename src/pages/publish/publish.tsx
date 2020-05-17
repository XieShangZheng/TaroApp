import Taro, { useState } from '@tarojs/taro'
import { ClTextarea } from 'mp-colorui'
import './publish.scss'

export default function Publish() {
  const [height, setHeight] = useState(200)
  const onLineChange = event => {
    console.log('%cAT-event: ', 'color: #bf2c9f; background: pink; font-size: 13px;', event);
    const { height: asHeight, heightRpx, lineHeight, lineCount } = event;
    // if (lineHeight * (lineCount + 1) * 2 > height / 2) {
    // setHeight(asHeight * 2)
    // }
    if (lineCount >= height / 50 - 1) {
      const h = height + 50;
      console.log('%cAT-h: ', 'color: #bf2c9f; background: pink; font-size: 13px;', h);
      setHeight(h)
    } else {
      setHeight(200)
    }
  }
  return (
    // <ClTextarea placeholder='请输入...' autoFocus height={200} />
    <ClTextarea
      shadow
      // showLengthTip
      height={height}
      bgColor='light-brown'
      placeholder='请输入...'
      autoFocus
      showConfirmBar
      onLineChange={onLineChange}
    />
  )
}