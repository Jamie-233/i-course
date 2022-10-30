import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User, UserAuth } from './entity'

const host = process.env.DATABASE_HOST
const database = process.env.DATABASE_NAME
const port = Number(process.env.DATABASE_PROT)
const username = process.env.DATABASE_USERNAME
const password = process.env.DATABASE_PASSWORD

const dataSource = new DataSource({
    type: 'mysql',
    host,
    port,
    username,
    password,
    database,
    entities: [User, UserAuth],
    synchronize: false,
    logging: true
})

dataSource.initialize()
    .then(() => {

    }).catch(error => console.log(error))

export default dataSource