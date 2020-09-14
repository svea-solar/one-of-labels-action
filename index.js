const core = require('@actions/core')

// group
const group = core
  .getInput('group', { required: true })
  .split(',')
  .map(x => x.trim())
  .filter(x => x)
core.info(`group: '${JSON.stringify(group)}'`)

// labels
const labels = core
  .getInput('labels', { required: true })
  .split(',')
  .map(x => x.trim())
  .filter(x => x)
core.info(`labels: '${JSON.stringify(labels)}'`)

// fallback
const fallback = core.getInput('fallback', { required: true }).trim()
core.info(`fallback: '${fallback}'`)

// intersect
const intersect = group.filter(x => labels.includes(x))
core.info(`intersect: '${JSON.stringify(intersect)}'`)
if (intersect.length === 0) {
  core.warning(`no labels found`)
}
if (intersect.length === 1) {
  core.info(`one label found`)
}
if (intersect.length > 1) {
  core.warning(`multiple labels found`)
}

// label
let label = fallback
if (intersect.length > 0 && intersect[0]) {
  label = intersect[0]
  core.info(`using label: '${label}'`)
} else {
  core.warning(`label is empty, using fallback: '${label}'`)
}

core.setOutput('label', label)
