import mongoose, { Mongoose } from 'mongoose'
import config, { IConfig } from 'config'

const mongoDbConfig: IConfig = config.get('App.database')

export const dbConect = async (): Promise<Mongoose> => {
  return await mongoose.connect(mongoDbConfig.get('mongoUrl'), {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}

export const dbClose = (): Promise<void> => mongoose.connection.close()
