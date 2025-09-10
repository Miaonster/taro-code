import { ImageProps, StandardProps } from '@tarojs/components'

export interface CommonImageProps
  extends Pick<ImageProps, 'lazyLoad' | 'showMenuByLongpress' | 'onLoad' | 'onError'>,
    StandardProps {}
