/**
 * Default course id for progress/chat when resolving from curriculum.
 * Must match `courses[0].id` in data/curriculum.js and rows in public.courses.
 */
import { courses } from '../data/curriculum.js'

export const DEFAULT_COURSE_ID = courses[0]?.id ?? 'javascript'
