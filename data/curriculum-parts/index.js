/**
 * Curriculum parts barrel: imports all topic modules and exports an ordered topics array.
 * Order is defined in order.js. Validation runs at load time.
 */
import { TOPIC_ORDER } from './order.js'
import topicConsoleLog from './topic-console-log.js'
import topicVariablesAndConstants from './topic-variables-and-constants.js'
import topicNumbersAndBasicArithmetic from './topic-numbers-and-basic-arithmetic.js'
import topicBuiltInMathUtilities from './topic-built-in-math-utilities.js'
import topicUndefinedNullBasics from './topic-undefined-null-basics.js'
import topicStringsAndBasicOperations from './topic-strings-and-basic-operations.js'
import topicTypeCoercion from './topic-type-coercion.js'
import topicOperatorsComparisonAndLogical from './topic-operators-comparison-and-logical.js'
import topicIfStatement from './topic-if-statement.js'
import topicIfElseStatement from './topic-if-else-statement.js'
import topicElseIfChains from './topic-else-if-chains.js'
import topicNestedConditions from './topic-nested-conditions.js'
import topicDateTime from './topic-date-time.js'
import topicWhileLoops from './topic-while-loops.js'
import topicForLoops from './topic-for-loops.js'
import topicLoopControl from './topic-loop-control.js'
import topicNestedLoops from './topic-nested-loops.js'
import topicArrays from './topic-arrays.js'
import topicObjects from './topic-objects.js'
import topicMapSet from './topic-map-set.js'
import topicDestructuring from './topic-destructuring.js'
import topicSpreadRest from './topic-spread-rest.js'
import topicJson from './topic-json.js'
import topicFunctions from './topic-functions.js'
import topicArrowFunctions from './topic-arrow-functions.js'
import topicRecursion from './topic-recursion.js'
import topicClosures from './topic-closures.js'
import topicForeach from './topic-foreach.js'
import topicMap from './topic-map.js'
import topicFilter from './topic-filter.js'
import topicFindFindindex from './topic-find-findindex.js'
import topicSomeEvery from './topic-some-every.js'
import topicReduce from './topic-reduce.js'
import topicStringManipulations from './topic-string-manipulations.js'
import topicSplitJoin from './topic-split-join.js'
import topicSubstringSlice from './topic-substring-slice.js'
import topicStringSearching from './topic-string-searching.js'
import topicRegex from './topic-regex.js'
import topicArrayAdvancedPatterns from './topic-array-advanced-patterns.js'
import topicErrorHandling from './topic-error-handling.js'
import topicClasses from './topic-classes.js'
import topicModules from './topic-modules.js'
import topicAsyncBasics from './topic-async-basics.js'
import topicPromises from './topic-promises.js'
import topicAsyncAwait from './topic-async-await.js'

const allTopics = [
  topicConsoleLog,
  topicVariablesAndConstants,
  topicNumbersAndBasicArithmetic,
  topicBuiltInMathUtilities,
  topicUndefinedNullBasics,
  topicStringsAndBasicOperations,
  topicTypeCoercion,
  topicOperatorsComparisonAndLogical,
  topicIfStatement,
  topicIfElseStatement,
  topicElseIfChains,
  topicNestedConditions,
  topicDateTime,
  topicWhileLoops,
  topicForLoops,
  topicLoopControl,
  topicNestedLoops,
  topicArrays,
  topicObjects,
  topicMapSet,
  topicDestructuring,
  topicSpreadRest,
  topicJson,
  topicFunctions,
  topicArrowFunctions,
  topicRecursion,
  topicClosures,
  topicForeach,
  topicMap,
  topicFilter,
  topicFindFindindex,
  topicSomeEvery,
  topicReduce,
  topicStringManipulations,
  topicSplitJoin,
  topicSubstringSlice,
  topicStringSearching,
  topicRegex,
  topicArrayAdvancedPatterns,
  topicErrorHandling,
  topicClasses,
  topicModules,
  topicAsyncBasics,
  topicPromises,
  topicAsyncAwait
]

function validateTopic(topic, index) {
  const prefix = `[curriculum-parts] Topic at index ${index} (id: ${topic?.id ?? '?'}):`
  if (!topic || typeof topic !== 'object') {
    throw new Error(`${prefix} must be an object.`)
  }
  if (!topic.id || typeof topic.id !== 'string') {
    throw new Error(`${prefix} missing or invalid "id".`)
  }
  if (!topic.title || typeof topic.title !== 'string') {
    throw new Error(`${prefix} missing or invalid "title".`)
  }
  if (!Array.isArray(topic.outcomes)) {
    throw new Error(`${prefix} "outcomes" must be an array of strings.`)
  }
  if (!Array.isArray(topic.tasks)) {
    throw new Error(`${prefix} "tasks" must be an array.`)
  }
  if (topic.outcome_messages != null) {
    if (!Array.isArray(topic.outcome_messages) || topic.outcome_messages.length !== topic.outcomes.length) {
      throw new Error(
        `${prefix} "outcome_messages" (if present) must be an array with length equal to "outcomes" (${topic.outcomes.length}).`
      )
    }
  }
}

const byId = Object.fromEntries(allTopics.map((t) => [t.id, t]))

const topics = TOPIC_ORDER.map((id) => {
  const topic = byId[id]
  if (!topic) {
    throw new Error(`[curriculum-parts] Missing topic for id: ${id}. Check order.js and topic files.`)
  }
  return topic
})

topics.forEach(validateTopic)

if (topics.length !== TOPIC_ORDER.length) {
  throw new Error(
    `[curriculum-parts] Topic count mismatch: expected ${TOPIC_ORDER.length}, got ${topics.length}.`
  )
}

export { TOPIC_ORDER, topics }
export default topics
