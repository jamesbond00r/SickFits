import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { withItemData, statelessSessions} from '@keystone-next/keystone/session'
import 'dotenv/config'
import { User } from './schemas/Users'
import { Product } from './schemas/Product'
import { ProductImage } from './schemas/ProductImage'
import { insertSeedData } from './seed-data';


const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 30, //How long they stay signed in
    secret: process.env.COOKIE_SECRET,

}

const { withAuth } =  createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        //Todo: add roles
    }
})

export default withAuth(config({
    //@ts-ignore
    server:{
        cors:{
            origin: [process.env.FRONTEND_URL],
            credentials: true,
        },
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL,
      async onConnect(keystone){
            console.log("connected to DB")
            if (process.argv.includes('--seed-data')) {
                await insertSeedData(keystone);
              }
        },
    },
    lists: createSchema({
        User,
        Product,
        ProductImage,
     }),
    ui:{
        //Show the UI only if you pass this test
        isAccessAllowed: ({ session }) => {return !!session?.data},
    },
    session: withItemData(statelessSessions(sessionConfig), {
        //Graphql query 
        User: `id`
        })
    })
);