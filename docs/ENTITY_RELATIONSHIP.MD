# Entity Relationship Diagram

## Diagram

```mermaid
erDiagram

USER {
  INTEGER id "[pk, auto_increment]"
  TEXT username "[unique]"
  TEXT email "[unique]"
  TEXT password ""
  DATETIME created_at "[current_timestamp]"
}

PLANT {
  INTEGER id "[pk, auto_increment]"
  INTEGER seller_id "[fk, ref USER.id]"
  TEXT name "[not null]"
}

RATING {
  INTEGER id "[pk, auto_increment]"
  INTEGER plant_id "[fk, ref PLANT.id]"
  INTEGER user_id "[fk, ref USER.id]"
  INTEGER rating "[not null, check: rating >= 0 and rating <= 5]"
  DATETIME created_at "[current_timestamp]"
}

USER ||--o{ PLANT: publish
USER ||--o{ RATING: rates
PLANT ||--o{ RATING: has
```

## Relations description

- `USER` can plublish ZERO or UNLIMITED `PLANT`s
- `USER` can create ZERO or UNLIMITED `RATING`s
- `PLANT` can have ZERO or UNLIMITED `RATING`s
- Each `RAGING` is created by ONE `USER`
- Each `RATING` belongs to ONE `PLANT`
- Each ``PLANT` is published by ONE `USER`
