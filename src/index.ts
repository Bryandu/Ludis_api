import { SetupApp } from '@/app/App'
;(async (): Promise<void> => {
  const setup = new SetupApp()
  await setup.init()
  setup.startApp()
})()
