import Taro, { useState, useEffect } from "@tarojs/taro";
import { ClMessage } from 'mp-colorui';

type types = {
  type: "success" | "error" | "warn" | "info" | "custom"
}

export default function AtMsg() {
  const [message, setMessage] = useState()
  const [type, setType] = useState<types['type']>('info');
  const [duration, setDuration] = useState(3);
  const [show, setShow] = useState(false);

  useEffect(() => {
    Taro.eventCenter.on('atMessage', (options = {}) => {
      const { message: asMsg, type: asType, duration: asDuration = 3 } = options
      setShow(true);
      setType(asType);
      setMessage(asMsg);
      setDuration(asDuration)
    })

    // 绑定函数
    Taro.atMessage = Taro.eventCenter.trigger.bind(
      Taro.eventCenter,
      'atMessage'
    )

    return () => {
      Taro.eventCenter.off('atMessage')
    }
  })

  return (
    <ClMessage onClose={() => setShow(false)} message={message} type={type} duration={duration} show={show} />
  )
}