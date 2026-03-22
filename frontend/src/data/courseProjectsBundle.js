/**
 * Portfolio Kit (course projects) shipped on completion — mirrors repo /projects.
 * Static files live under public/course-projects — run `npm run sync:projects` after changing /projects.
 */

export const COURSE_PROJECTS_ZIP_FILENAME = 'sara-javascript-capstone-projects.zip'

/** Root folder name inside the ZIP */
export const COURSE_PROJECTS_ZIP_ROOT = 'sara-capstone-projects'

/**
 * Paths relative to public/course-projects (and inside the ZIP under COURSE_PROJECTS_ZIP_ROOT).
 */
export const COURSE_PROJECT_FILE_PATHS = [
  'task-manager-priority-queue/Task.js',
  'task-manager-priority-queue/TaskManager.js',
  'task-manager-priority-queue/index.js',
  'task-manager-priority-queue/tasks.json',
  'task-manager-priority-queue/PriorityQueue.js',
  'task-manager-priority-queue/README.md',
  'task-manager-priority-queue/package.json',
  'terminal-hangman-game/README.md',
  'terminal-hangman-game/package.json',
  'terminal-hangman-game/index.js',
  'terminal-hangman-game/stats.json',
  'terminal-hangman-game/Game.js',
  'terminal-hangman-game/words.js',
  'personal-finance-tracker/index.js',
  'personal-finance-tracker/Transaction.js',
  'personal-finance-tracker/data.json',
  'personal-finance-tracker/FinanceTracker.js',
  'personal-finance-tracker/README.md',
  'personal-finance-tracker/package.json',
]

export const COURSE_PROJECTS_BUNDLE_README = `SARA — JavaScript Course: Project Portfolio Pack
=================================================

You finished the course. These three projects are what you build next.

Not exercises. Not demos. Real programs you can open in an interview,
walk through line by line, and say — "I studied this, extended it,
and I can explain every part of it."


WHAT'S INSIDE
-------------
task-manager-priority-queue/
terminal-hangman-game/
personal-finance-tracker/

Three separate, self-contained Node.js apps.
No frameworks. No npm install. Just JavaScript — the same JavaScript
you spent 41 topics learning.


BEFORE YOU START
----------------
These projects run in the terminal using Node.js.
Download and install it at nodejs.org — choose the LTS version.


HOW TO RUN ANY PROJECT
----------------------
1. Unzip and open a folder in your editor
2. Open your terminal, cd into that folder
3. Run: node index.js
4. Each project has its own README.md with full feature details


THE THREE PROJECTS
------------------

01 — Personal Finance Tracker
     Track income and expenses, categorize spending, calculate savings
     rate, and flag when you're overspending. Real-world data modeling
     with JSON persistence.

     Skills on display: Arrays, Objects, Reduce, Filter, Map, Classes,
     JSON, Error Handling, DateTime, Modules

02 — Task Manager with Priority Queue
     Create tasks with deadlines and priorities, mark them complete,
     filter by status, and persist everything across sessions.

     Skills on display: Classes, Inheritance, Async/Await, Promises,
     JSON, Closures, Spread/Rest, Modules, DateTime

03 — Terminal Hangman Game
     A fully playable word-guessing game in the terminal with difficulty
     levels, session stats, and persistent high scores saved to disk.

     Skills on display: Strings, Arrays, Regex, Loops, Functions,
     Recursion, JSON, Error Handling, Modules


HOW TO ACTUALLY USE THESE
--------------------------
Study it. Extend it. Own it.

Pick one project. Before opening any file, read its README and ask:
"What function runs when I press 1 in this menu?" Then open the file
and check. This loop — predict, verify, understand — is the habit that
makes you hireable.

Once you understand a project:
  → Add one small feature
  → Break something intentionally
  → Read the stack trace and fix it

When you've done that — you've built it. That's what employers mean
when they say "problem-solving skills."


A NOTE ON THESE BEING TERMINAL APPS
------------------------------------
No UI. Intentional.

A browser hides what's happening. The terminal doesn't. Every input,
every output, every error is yours to see and control. When you can
build logic that works without a framework holding it up — that's when
you actually know JavaScript.


TECHNICAL REQUIREMENT
---------------------
Node.js LTS — nodejs.org. Nothing else.


Built for Sara JavaScript Course graduates.
You did the hard part. Now make it yours.
`
