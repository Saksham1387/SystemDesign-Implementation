import { PrismaClient } from "@prisma/client";

export abstract class BaseRepository<T>{
    protected clients: PrismaClient[];

    constructor(clients:PrismaClient[]){
        this.clients = clients;
    }

    protected getReadReplica(){
        return this.clients[Math.floor(Math.random() * this.clients.length)]
    }
}

