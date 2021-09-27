const employeesData = [{
  id: 2,
  name: 'Abhishek (CTO)',
  reportees: [6]
}, {
  id: 3,
  name: 'Abhiram (COO)',
  reportees: []
}, {
  id: 6,
  name: 'Abhimanyu (Engineering Manager)',
  reportees: [9]
}, {
  id: 9,
  name: 'Abhinav (Senior Engineer)',
  reportees: []
}, {
  id: 10,
  name: 'Abhijeet (CEO)',
  reportees: [2, 3],
}];

/*
your logging should look like this

A (CEO)
----B (CTO)
--------D (Engineering Manager)
------------E (Senior Software Engineer)
----C (COO)

Given an array of object containing list of employee data such that each employee has list of reportee. Use this information to construct a hirerachy of employees.
https://github.com/devAbhijeet/job-hunt-interview-questions-2020
*/

/**
 * this is like topological sort
 * should be no cycles
 */

function findRoot() {
  const indegrees = {}
  employeesData.forEach(item => {
    indegrees[item.id] = 0
  })

  for (const item of employeesData) {
    item.reportees.forEach(id => {
      indegrees[id] += 1
    })
  }

  // console.log(indegrees)
  // { '2': 1, '3': 1, '6': 1, '9': 1, '10': 0 }
  for (const [key, val] of Object.entries(indegrees)) {
    if (val === 0) {
      return key
    }
  }
}

let out = ''

function traverse(rootId, depth) {
  // look up should be constant here, use index instead
  const root = employeesData.find(item => item.id == rootId)
  console.log('-'.repeat(depth), root.name)

  root.reportees.forEach(id => {
    traverse(id, depth + 1)
  })
}

traverse(findRoot(), 0)