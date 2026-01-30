import { NextApiRequest, NextApiResponse } from 'next'
import { navigation } from '../../navigation'
import { Octokit } from 'octokit'

{/* https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#list-releases-for-a-repository */}

type Data = {
    results: string[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { repo } = req.query
    const octokit = new Octokit({
        auth: process.env.GH_TOKEN,
    })

    const { data } = await octokit.request('GET /repos/{owner}/{repo}/releases?page=1&per_page=100', {
        owner: 'fold-ui',
        repo: String(repo),
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
        },
    })

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ 
        results: data.map((d) => ({
            html_url: d.html_url,
            tag_name: d.tag_name,
            published_at: d.published_at,
            body: d.body,
        }))
    }))
}
