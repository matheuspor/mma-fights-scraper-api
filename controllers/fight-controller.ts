import { Request, Response } from "express"
import { getFights } from "../services/fightService"

const getAll = async (req: Request, res: Response) => {
    const fights = await getFights()
    return res.status(200).send(fights)    
}

export default getAll