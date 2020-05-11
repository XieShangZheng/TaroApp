declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
declare const process: {
	env: {
		TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq'
		[key: string]: any
	}
};

type bgColorType =
	| 'red'
	| 'orange'
	| 'yellow'
	| 'olive'
	| 'green'
	| 'cyan'
	| 'blue'
	| 'purple'
	| 'mauve'
	| 'pink'
	| 'brown'
	| 'grey'
	| 'gray'
	| 'black'
	| 'white';

type bgColorMoreType =
	| 'gradualRed'
	| 'gradualOrange'
	| 'gradualGreen'
	| 'gradualPurple'
	| 'gradualPink'
	| 'gradualBlue';

type lightBgColorType =
	| 'light-red'
	| 'light-orange'
	| 'light-yellow'
	| 'light-olive'
	| 'light-green'
	| 'light-cyan'
	| 'light-blue'
	| 'light-purple'
	| 'light-mauve'
	| 'light-pink'
	| 'light-brown'
	| 'light-grey'
	| 'light-gray'
	| 'light-black'
	| 'light-white';

interface AtMsgOptions {
	/**
   * 类型，custom 下可自定义背景色
   *
   * 可选类型 `success`, `error`, `warn`, `info`, `custom`
   *
   * 默认 `info`
   */
	type: 'success' | 'error' | 'warn' | 'info' | 'custom'
	/**
   * 背景色
   */
	bgColor?: bgColorType | bgColorMoreType | lightBgColorType
	/**
   * 提示消息
   */
	message?: string
	/**
   * 是否展示
   */
	show?: boolean
	/**
   * 持续时间
   *
   * 默认 `3`
   */
	duration?: number
	/**
   * 关闭事件
   */
	onClose?: () => void
}

declare namespace Taro {
	function atMsg(options: AtMsgOptions): void;
}
