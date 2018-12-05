# Design Decisions

1. Decision to have a CSV data structure and not a database
   Trust us, we tried very hard to implement a database in Heroku! But we realized we were running out of time and building out the
   data structure in CSV was simply more feasible. So that's been our workaround. If you look closely around the code, you'll see
   the ghosts of database code past. We plan to implement a database for Y Circular the week of December 17 when we both have more time.

2. The hideousness of the confirmation email body
   This is because we did not get a chance to figure out templating for email bodies. We spent substantial time getting the
   email code.
