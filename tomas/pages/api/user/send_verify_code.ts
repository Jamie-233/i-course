import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import md5 from 'md5'
import { format } from 'date-fns'
import { encode } from 'js-base64'
import request from 'service/fetch'
import { ISession } from 'pages/api'
import { ironOptions } from 'config'

export default withIronSessionApiRoute(sendVerifyCode, ironOptions)

async function sendVerifyCode(req: NextApiRequest, res: NextApiResponse) {
    const session: ISession = req.session;

    const { to, templateId = '1' } = req.body
    const expireMinute = '3'
    const account_id = process.env.ACCOUNT_ID
    const auth_token = process.env.AUTH_TOKEN
    const now_date = format(new Date(), 'yyyyMMddHHmmss')
    const sig_parameter = md5(`${account_id}${auth_token}${now_date}`)
    const Authorization = encode(`${account_id}:${now_date}`)
    const verify_code = Math.floor(Math.random() * (9999 - 1000))

    console.log(verify_code);

    const url = `http://localhost:3000/api/accounts/get_sms_code`

    const data: any = await request.post(url, {
        to,
        templateId,
        sig: sig_parameter,
        account: account_id,
        data: [verify_code, expireMinute]
    }, {
        headers: {
            Authorization
        }
    })

    const { code, msg } = data

    console.log(data);


    if (code === '000000') {
        session.verify_code = verify_code
        await session.save()

        res.status(200).json({ code: 0, msg, data: { template_sms: '1111' } })
    }
    else {
        res.status(200).json({ code, msg: 'error' })
    }
}