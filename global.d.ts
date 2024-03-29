// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
declare const process: {
  env: {
    npm_package_version: string
    TARO_ENV: 'weapp' | 'alipay' | 'h5'
    NODE_ENV: NodeEnv
    API_ENV: ApiEnv
    WX_CONFIG: NodeEnv
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
}
