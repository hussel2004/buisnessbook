# Business Directory API - Spring Boot Backend

This is the backend REST API for the Business Directory application.

## Technology Stack

- **Java 21 LTS**
- **Spring Boot 3.4.1**
- **Spring Data JPA** (Hibernate)
- **Spring Security** with JWT authentication
- **PostgreSQL** database
- **Maven** build tool
- **File Upload** support for images

## Prerequisites

⚠️ **IMPORTANT: Java 21 LTS is Required**

This project **must** use **Java 21 LTS** due to Maven Compiler Plugin compatibility issues with newer Java versions (Java 24, 25). Using Java 24 or 25 will result in compilation errors.

**Requirements:**
- **Java 21 LTS** (Download from: https://www.oracle.com/java/technologies/downloads/#java21)
- PostgreSQL 12 or higher
- Maven 3.6 or higher

**Why Java 21?**
- Spring Boot 3.4.1 is fully tested and supported with Java 21 LTS
- Maven Compiler Plugin 3.13.0 has compatibility issues with Java 24+
- Java 21 is the current production-ready LTS version (supported until 2029)

## Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE businessdirectory;
```

2. Update database credentials in `src/main/resources/application.yml` or set environment variables:
```bash
export DATABASE_URL=jdbc:postgresql://localhost:5432/businessdirectory
export DATABASE_USERNAME=postgres
export DATABASE_PASSWORD=your_password
export JWT_SECRET=your-secret-key-at-least-256-bits-long
```

## Running the Application

### Using Maven

```bash
cd backend
mvn spring-boot:run
```

### Using JAR

```bash
mvn clean package
java -jar target/business-directory-api-1.0.0.jar
```

The API will be available at `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Businesses (Public)
- `GET /api/businesses` - Get all businesses (paginated)
- `GET /api/businesses/{id}` - Get business by ID
- `GET /api/businesses/slug/{slug}` - Get business by slug
- `GET /api/businesses/search?keyword=` - Search businesses
- `GET /api/businesses/category/{category}` - Get businesses by category
- `GET /api/businesses/popular` - Get popular businesses

### Businesses (Authenticated)
- `GET /api/businesses/my-businesses` - Get current user's businesses
- `POST /api/businesses` - Create a new business
- `PUT /api/businesses/{id}` - Update a business
- `DELETE /api/businesses/{id}` - Delete a business

### Posts
- `GET /api/posts/business/{businessId}` - Get posts by business
- `GET /api/posts/recent` - Get recent posts
- `GET /api/posts/{id}` - Get post by ID
- `POST /api/posts` - Create a new post (authenticated)
- `PUT /api/posts/{id}` - Update a post (authenticated)
- `DELETE /api/posts/{id}` - Delete a post (authenticated)
- `POST /api/posts/{id}/like` - Like a post (authenticated)
- `DELETE /api/posts/{id}/like` - Unlike a post (authenticated)
- `GET /api/posts/{id}/is-liked` - Check if post is liked (authenticated)

### Comments
- `GET /api/comments/business/{businessId}` - Get comments by business
- `GET /api/comments/post/{postId}` - Get comments by post
- `POST /api/comments` - Create a comment (authenticated)
- `DELETE /api/comments/{id}` - Delete a comment (authenticated)

### Promotions
- `GET /api/promotions/business/{businessId}` - Get promotions by business
- `GET /api/promotions/active` - Get all active promotions
- `POST /api/promotions` - Create a promotion (authenticated)
- `PUT /api/promotions/{id}` - Update a promotion (authenticated)
- `DELETE /api/promotions/{id}` - Delete a promotion (authenticated)

### File Upload
- `POST /api/upload/image` - Upload an image file (authenticated)
  - Accepts: `multipart/form-data` with file field named `file`
  - Max size: 5MB
  - Allowed types: Images only (jpg, png, gif, etc.)
  - Returns: `{ "url": "/uploads/filename.ext", "message": "File uploaded successfully" }`

## Authentication

The API uses JWT (JSON Web Token) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## User Roles

- **VISITOR**: Can view content, comment, and like posts
- **BUSINESS_OWNER**: Can create and manage businesses, posts, and promotions
- **ADMIN**: Full access to all resources

## CORS Configuration

CORS is configured to allow requests from `http://localhost:3000` by default. Update `cors.allowed-origins` in `application.yml` to change this.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection URL | `jdbc:postgresql://localhost:5432/businessdirectory` |
| `DATABASE_USERNAME` | Database username | `postgres` |
| `DATABASE_PASSWORD` | Database password | `postgres` |
| `JWT_SECRET` | Secret key for JWT signing | (change in production) |
| `CORS_ORIGINS` | Allowed CORS origins | `http://localhost:3000` |
| `FILE_UPLOAD_DIR` | Directory for uploaded files | `uploads` |

## Development

The application uses Spring Boot DevTools for automatic restart during development.

JPA's `ddl-auto` is set to `update`, which will automatically create and update database tables based on entity classes.

## Production Deployment

1. Update `application.yml` with production database credentials
2. Set a strong `JWT_SECRET` (at least 256 bits)
3. Configure proper CORS origins
4. Build the application: `mvn clean package`
5. Run the JAR file: `java -jar target/business-directory-api-1.0.0.jar`
