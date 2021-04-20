import mongoose, { Mongoose } from 'mongoose'
import config, { IConfig } from 'config'

const mongoDbConfig: IConfig = config.get('App.database')
const mongoUrl: string = mongoDbConfig.get('mongoUrl')

export const dbConect = async (): Promise<Mongoose> => {
  return await mongoose.connect(mongoUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}

export const dbClose = (): Promise<void> => mongoose.connection.close()
