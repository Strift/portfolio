---
title: A structured approach to Vibe Coding
date: 2025-04-07
description: Level up your LLM-assisted development. Discover a structured workflow to define specs, manage tasks, and provide your AI pair programming assistant with exactly the context it needs.
cover: /images/articles/covers/cursor.png
coverAlt: 'Cursor logo'
lang: 'en'
tags:
  - engineering
  - llm
---

In this guide, you’ll learn my tips for setting up a good environment for vibe coding. I use Cursor, but you can likely achieve a similar workflow using other tools.

## The problem—context

When coding by interacting with LLMs, we often encounter what’s commonly called “garbage in, garbage out.”

Put simply, context is essential. If you provide too little context, the LLM produces generic output; too much context makes it difficult for the model to determine what’s important.

To address this, you should provide just enough information for the task at hand. In this context, that means giving the LLM what it needs to generate correct code. Not too much, so it doesn’t derail and start generating unrequested features.

In this guide, you’ll learn to
- Give general instructions to your models
- Provide enough context for your tasks
- Develop by small iterations

## Configuring system rules for your environment

When working with LLMs, instructions and prompt engineering are the primary ways we can tune the model’s behavior.

The same approach applies to vibe coding. In Cursor, these system prompts are written as Cursor rule files. Cursor loads these files as extra instructions for the model, based on file-matching patterns.

For example, you can create a `.cursor/rules/general.mdc` rule that applies to all files:

```mdc
---
description:
globs:
alwaysApply: false
---
## Agent instructions

- When searching for documentation, use Context7.
- Run the shell commands yourself, so you can see the output.

## Coding Instructions

- Write the absolute minimum code required.
- No sweeping changes.
- No unrelated edits - focus on just the task you're on.
- Make code precise, modular, and testable.
- Don’t break existing functionality.
- Use concise, meaningful comments - only for complex logic.
```

> 💡 “Run the shell commands yourself” is my latest favorite . It ensures Cursor executes code in the integrated shell. This way, it can read the output and follow up!

File patterns, as you might expect, restrict when Cursor loads the given rules, and therefore when the model applies them.

For example, here’s a `.cursor/rules/frontend.mdc` rule that applies only to Vue components:

```md
---
description:
globs: *.vue
alwaysApply: false
---
- Always put the script before the template
```

## Creating enough context for the models

It’s tempting to simply type “build this” and hope for the best. For simple components or scaffolding, that might work. But for components with more involved functionality, it’s easy to hit roadblocks.

That’s where specifications come in! If you’re working from a PRD or clearly defined specifications, you can skip to the next section. Otherwise, keep reading!

### Generating your PRD

Step into the PM role! Collaborate with an LLM to discuss the app you want to build, refining the proposal together as you progress, and come to a clear definition of the application or feature you want to create.

Personally, I prefer Claude due to its ability to generate diagrams. I often ask it to produce a diagram of the architecture to confirm I understand its proposal—and to check it understands my expectations.

> 💡 Use standard LLM best practices here—edit and branch the conversation as necessary, keeping only the most relevant content.

Once you have a clear discussion, ask the model to summarize a comprehensive description. Refine the summary as needed until it’s accurate.

### Generating your specifications

With a PRD in hand, the next step is producing technical specifications.

Begin by scaffolding out the project’s architecture. This allows the model to follow a pre-defined design when working, even from scratch.

For this, you want models that produce natural, prose-like content that captures the intent of your plan. I currently use Gemini 2.5 Flash for its wide context window and cost-efficiency, but any concise model works (GPT 4.1, Claude 3.5 Sonnet, etc.).

#### Generating the project architecture

```md
I’m building a [short description of the product] (description attached below). Use Nuxt 3 for frontend, Sqlite for database, Meilisearch for search.

Give me the full architecture:
- File + folder structure
- What each part does
- Where state lives, how services connect

Format this entire document in Markdown.
```

Save the output as `architecture.md` in your project directory.

#### Generating tasks

Next, use the project description and architecture to generate a list of tasks for the LLM to execute.

My preferred model for this is Google Gemini 2.5 Pro, which I find excels at writing detailed instructions for coding workflows.

```md
Using that architecture, write a granular step-by-step plan to build the MVP.

Each task should:
- Be incredibly small + testable
- Have a clear start + end
- Focus on one concern

I’ll be passing this off to an engineering LLM that will be told to complete one task at a time, allowing me to test in between.
```

Save the output as `tasks.md` in your project folder, and you’re set.

## Building incrementally with your AI assistant

### Implementing tasks individually

With your files prepared, prompt Cursor to use them as reference for its work.

Each time you start new instructions, include this section:

```md
You’re an engineer building this codebase.

You've been given @architecture.md and @tasks.md.
- Read both carefully. There should be no ambiguity about what we’re building.
- Follow @tasks.md and complete one task at a time.
- After each task, stop. I’ll test it. If it works, tell you to move to the next step.

(This is the part that changes!)
Proceed to implement task 1.1.
```

If this process feels repetitive, you can create a Notepad in Cursor to streamline your prompts. I keep these instructions in a Notepad called ‘Consider architecture and tasks’ that I just reference in my prompts.

<article-image src="/images/articles/vibe-coding-tutorial/cursor-notepad-example.png" alt="Screenshot of using a ’Consider architecture and tasks’ Notepad in Cursor AI chat" title="Leveraging Cursor Notepads to avoid repetition">
Leveraging Cursor Notepads to avoid repetition
</article-image>

At this point, I prefer using Claude 3.7 Sonnet, as I’ve found it best for following instructions. 3.5 is faster and still performs well. For more complex challenges, though, I return to Sonnet 3.7 (without extended thinking mode).

### Updating the context files

Following this workflow, expect to repeat the loop:
- Ask the LLM to complete a step
- Test manually (or better—write tests!)
- Commit; and proceed

Sometimes, you may need to jump in and code yourself if the model gets stuck, instructions aren’t clear, or if there’s existing code you didn’t account for when generating the architecture.

You may also find that `architecture.md` and `tasks.md` fall out of sync with changes in your codebase.

When this happens, ask the LLM to update those files by explaining what changed. I use Gemini Pro 2.5 (inside Cursor, so it can see the code) to revise my context documents.

```md
@Consider architecture and tasks

meilisearch/ingest.ts has been moved to scripts/ingest.mjs.

The tasks.md and architecture.md files need to be updated accordingly.
```

This approach helps keep your architecture and task files consistent with your code at all times.

## Wrapping up

Here’s a quick summary of what we covered:

- Establish system rules with Cursor rules
- Invest time in a clear PRD before you start coding
- Augment context with LLM-oriented specifications
- Keep your context in sync: Update your architecture and tasks files

The more relevant information you feed the models, the more relevant the output will be—and the better the vibes.

> Thanks to [@vasumanmoza](https://x.com/vasumanmoza) and [@PrajwalTomar_](https://x.com/PrajwalTomar_) for sharing their Cursor wisdom on X 🙇
