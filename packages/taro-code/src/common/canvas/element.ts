import Taro from '@tarojs/taro'

const getElement = async (id: string, rootSelector?: string): Promise<Taro.Canvas | undefined> => {
  if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
    const canvasWrap = document.getElementById(id) as HTMLDivElement
    const canvas = canvasWrap.children[0] as unknown as Taro.Canvas | undefined
    return await Promise.resolve(canvas)
  } else {
    return await new Promise((resolve) => {
      const selector = rootSelector != null ? `${rootSelector} >>> #${id}` : `#${id}`
      Taro.createSelectorQuery()
        .select(selector)
        .fields({ node: true, size: true })
        .exec((res: Array<{ node: Taro.Canvas }>) => {
          if (res[0]?.node != null) {
            const canvas = res[0].node
            resolve(canvas)
          } else {
            resolve(undefined)
          }
        })
    })
  }
}

export const waitForElement = async (id: string, rootSelector?: string, step = 0): Promise<Taro.Canvas | undefined> => {
  try {
    const canvas = await getElement(id, rootSelector)
    if (canvas != null) {
      return canvas
    } else {
      if (step + 1 < 100) {
        await new Promise((resolve) => setTimeout(resolve, 10))
        return await waitForElement(id, rootSelector, step + 1)
      }
    }
  } catch (error) {}
}
