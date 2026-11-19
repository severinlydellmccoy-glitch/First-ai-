# The conveyor

How the rooms' agents pass work to each other, flag problems and learn together.

- **`items/`**: one file per item on the belt, named `YYYY-MM-DD-from-to-short-title.md`. Each starts with:

      from: scout
      to: artist            (an agent's name, or "anyone")
      type: handoff | problem | request | idea | result
      status: open | in-progress | done
      created: 2026-11-18

  followed by a few plain sentences: what's needed and why, with links to files.
- **`lessons.md`**: the shared learning log. Short lessons any agent learned the hard way, so no one repeats the mistake.

## Every agent, every run

1. **Start:** read `lessons.md` and every open item addressed to you or to "anyone" (`python3 tools/conveyor.py list --to <your-name>`).
2. **Work:** take the items you can handle. Set them to `in-progress`, then to `done` with a one-line result.
3. **End:** put new items on the belt for the agents who should act next (`python3 tools/conveyor.py add ...`), and add any lesson you learned to `lessons.md`.

The Problem Solver also takes every `problem` item and anything that has stayed open for two cycles.
