import { PrismaClient } from "@prisma/client";


export const primaryPrisma = new PrismaClient({
    datasources:{
        db:{
            url: process.env.PRIMARY_DATABASE_URL
        }
    }
})


export const replicaPrismas = [
    new PrismaClient({
        datasources:{
            db:{
                url: process.env.READ_REPLICA_1_URL
            }
        }
    }),

    new PrismaClient({
        datasources:{
            db:{
                url: process.env.READ_REPLICA_2_URL
            }
        }
    })
]