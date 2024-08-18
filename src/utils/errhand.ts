import 'server-only'

// eslint-disable-next-line
const errHand = <T extends (...args: any[]) => Promise<any>>(cb: T) => {
  return async (...args: Parameters<T>): Promise<{ success?: Awaited<ReturnType<T>>; error?: string }> => {
    try {
      const temp = await cb(...args)
      return { success: temp }
    } catch (error: any) {
      console.error(error)
      return { error: error.message }
    }
  }
}

export default errHand
