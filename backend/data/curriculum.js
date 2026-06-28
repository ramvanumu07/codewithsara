import { topics } from './curriculum-parts/index.js'
import { dsaTopics } from './dsa-curriculum-parts/index.js'

const courses = [
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'Master JavaScript from fundamentals to advanced concepts',
    topics
  },
  {
    id: 'dsa',
    title: 'DSA',
    description: 'Data Structures & Algorithms — unlocks after you complete JavaScript',
    topics: dsaTopics
  }
]

export { courses }
export default courses
