
import { prisma } from "../lib/prisma";

 export interface allergen {
    id : string,
   createdAt :Date
updatedAt : Date
userId : string
}

 export const userAllergen = async (id: string| undefined) : Promise<allergen[]>=>{
const user =  await prisma.user.findUnique({where: {id: id}})
const allergen = await prisma.allergen.findMany({where : { userId: user?.id} })
return allergen

}