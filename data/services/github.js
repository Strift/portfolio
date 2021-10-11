import { Octokit } from '@octokit/core'
import { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods'

const OktokitWithRestPlugin = Octokit.plugin(restEndpointMethods)

const github = new OktokitWithRestPlugin()

export async function getReadme (owner, repository) {
  const { data: content } = await github.rest.repos.getReadme({
    mediaType: {
      format: 'raw'
    },
    owner,
    repo: repository
  })
  return content
}
