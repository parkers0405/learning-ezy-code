# Errors and exceptions

## Behavioral contract

`describePositiveCount("4")` returns `"count: 4; finished"`, `describePositiveCount("no")` returns `"number required; finished"`, and `describePositiveCount("-1")` returns `"positive value required; finished"`.

## Practice instruction

Keep the supplied `try`, `throw`, and `finally`. In `catch`, use `caught instanceof Error` before reading `.message`. The `: unknown` annotation is supplied strict-checker notation and is decoded in the reading.
