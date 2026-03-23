# AQA GCSE Computer Science Quiz

A dependency-free quiz website for practising AQA GCSE Computer Science specification content.

## What it includes

- Topic selection across the eight main AQA GCSE Computer Science specification areas.
- Question categories:
  - all questions
  - unanswered
  - answered wrong
  - unanswered / incorrectly answered
- Adjustable question count.
- Random, topic-order, or original-order sessions.
- Questions stored locally in `data/questions.js`.
- Multiple choice answers with instant red/green feedback.
- Built-in hints and built-in explanations for each question.
- Optional AI explanations using the Vercel AI Gateway API from the browser.
- Local progress saving for:
  - unattempted
  - correct
  - correct more than once
  - incorrect
- A question map that groups every question by topic and shows its current status.
- Save-code export/import so progress can be moved or restored later.

## Run locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Vercel AI Gateway

Paste your API key into the app and save it locally in the browser. You can also generate a progress code from the sidebar and later paste it back in to restore your saved answers. The site sends requests to:

```text
https://ai-gateway.vercel.sh/v1/chat/completions
```

using the model identifier `openai/gpt-4o-mini`.
