# Project Key Notes

## Personal Learning Documentation

This file contains important notes and learnings from the Business Directory project development.

---

## Database Schema Management

### Automatic Schema Updates

**Important:** The database schema will automatically update when you restart the backend application.

- **How it works:** JPA's `ddl-auto` is set to `update` in the application configuration
- **What this means:**
  - When you add new fields to entity classes (Business, Post, Comment, etc.), the corresponding database tables will be automatically updated
  - New columns will be created without losing existing data
  - New tables will be created for new entities
  - No manual SQL migration scripts are needed during development

- **Location:** This setting is configured in `src/main/resources/application.properties` or `application.yml`

- **Example:** When we added fields like `code`, `shortName`, `yearFounded` to the Business entity, these columns were automatically created in the `businesses` table upon backend restart

**Note:** For production environments, it's recommended to use `ddl-auto=validate` and manage schema changes with proper migration tools like Flyway or Liquibase.

---

## Additional Notes

_More notes will be added here as the project progresses..._
