import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from "config";
import { User, UserAuth } from 'db/entity'
import dataSource from 'db'

export default withIronSessionApiRoute(login, ironOptions)

async function login(req: NextApiRequest, res: NextApiResponse) {
    const { phone = '', verify = '' } = req.body;
    const userRepo = await dataSource.getRepository(User)
    const users = await userRepo.find()

    console.log('------', users);
    // console.log('----', phone, verify);
    res.status(200).send({ code: 0, phone, verify })
}