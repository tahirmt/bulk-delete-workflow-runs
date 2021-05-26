import { Octokit } from '@octokit/core'
const [owner, repo, workflowIdOrName, githubPAT] = process.argv.slice(2)

const octokit = new Octokit({ auth: githubPAT })

const getIDFromWorkflowName = async (workflowIdOrName: string) => {
  try {
    const allWorkflows = await octokit.request('GET /repos/{owner}/{repo}/actions/workflows', {
      owner,
      repo,
      per_page: 100,
    })

    const idFromWorkflowName = allWorkflows.data.workflows.filter(
      (workflow: { [key: string]: string }) => ((workflow.name === workflowIdOrName) || (workflow.id == workflowIdOrName) || (workflow.path.endsWith(workflowIdOrName))),
    )[0]?.id

    if (!idFromWorkflowName) {
      throw new Error('No workflow exists with that name')
    }

    console.log(`Workflow ID is ${idFromWorkflowName}`)
    return idFromWorkflowName
  } catch (e) {
    console.log('Failed to get all workflows')

    throw new Error(e)
  }
}

const init = async () => {
  const workflowRunsByID = await octokit.request(
    'GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs',
    {
      owner,
      repo,
      workflow_id: await getIDFromWorkflowName(workflowIdOrName),
      per_page: 100,
    },
  )

  workflowRunsByID.data.workflow_runs.forEach(async (run: { [key: string]: string }) => {
    console.log(`Deleting run with ID ${run.id}`)

    await octokit.request('DELETE /repos/{owner}/{repo}/actions/runs/{run_id}', {
      owner,
      repo,
      run_id: run.id,
    })
  })
}

init()
