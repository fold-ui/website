import { NextApiRequest, NextApiResponse } from 'next'
import { navigation } from '../../navigation'
import { remark } from 'remark'
import html from 'remark-html'
import { Octokit } from 'octokit'

async function markdownToHtml(markdown: string) {
    const result = await remark().use(html).process(markdown)
    return result.toString()
}

type Data = {
    results: string[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { id } = req.query
    const octokit = new Octokit({
        auth: process.env.GH_TOKEN,
    })

    const { data: { body } } = await octokit.request('GET /repos/{owner}/{repo}/releases/{release_id}', {
        owner: 'fold-ui',
        repo: 'fold',
        release_id: +id,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
        },
    })

    const html = await markdownToHtml(body)

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ html }))
}
