# Business Directory - Full-Stack Application

A complete, production-ready full-stack Business Directory application built with Next.js and Spring Boot.

## Technology Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript**
- **Tailwind CSS 4** for styling
- **Axios** for API calls
- **Lucide React** for icons
- **date-fns** for date formatting

### Backend
- **Spring Boot 3.2.0**
- **Java 21**
- **Spring Security** with JWT authentication
- **Spring Data JPA** (Hibernate)
- **PostgreSQL** database
- **Maven** build tool

## Features

### User Roles
- **VISITOR**: Browse businesses, comment on business pages and posts, like posts
- **BUSINESS_OWNER**: All visitor features + create/manage businesses, posts, and promotions
- **ADMIN**: Full access to all resources

### Core Features
- User registration and authentication (JWT-based)
- Business directory with search and category filtering
- Business detail pages with tabs (Home, About, Posts, Promotions)
- Real-time comments sidebar on business pages
- Post creation with like and comment functionality
- Promotion management with expiry dates
- Business owner dashboard
- Responsive design for mobile and desktop

## Project Structure

```
business-directory/
├── backend/                     # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/businessdirectory/
│   │   │   │   ├── controller/      # REST API controllers
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── exception/       # Exception handlers
│   │   │   │   ├── model/           # JPA entities
│   │   │   │   ├── repository/      # JPA repositories
│   │   │   │   ├── security/        # Security configuration
│   │   │   │   └── service/         # Business logic
│   │   │   └── resources/
│   │   │       └── application.yml   # Application configuration
│   │   └── test/
│   └── pom.xml                   # Maven dependencies
│
├── frontend/                     # Next.js frontend
│   ├── app/                      # Next.js app directory
│   │   ├── auth/                 # Authentication pages
│   │   ├── business/             # Business detail pages
│   │   ├── directory/            # Business listing page
│   │   ├── owner/                # Business owner dashboard
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Homepage
│   │   └── globals.css           # Global styles
│   ├── components/               # Reusable components
│   ├── lib/                      # Utilities and API clients
│   ├── types/                    # TypeScript type definitions
│   └── package.json              # npm dependencies
│
└── README.md
```

## Prerequisites

- **Node.js** 18+ and npm/yarn
- **Java 21**
- **Maven 3.6+**
- **PostgreSQL 12+**

## Getting Started

### 1. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE businessdirectory;
```

### 2. Backend Setup

```bash
cd backend

# Configure database credentials (optional - use environment variables)
# Edit src/main/resources/application.yml or set these environment variables:
export DATABASE_URL=jdbc:postgresql://localhost:5432/businessdirectory
export DATABASE_USERNAME=postgres
export DATABASE_PASSWORD=your_password
export JWT_SECRET=your-secret-key-at-least-256-bits-long

# Run the application
mvn spring-boot:run
```

The backend API will be available at `http://localhost:8080`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## API Documentation

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "BUSINESS_OWNER"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Business Endpoints

- `GET /api/businesses` - Get all businesses (paginated)
- `GET /api/businesses/{id}` - Get business by ID
- `GET /api/businesses/slug/{slug}` - Get business by slug
- `GET /api/businesses/search?keyword={keyword}` - Search businesses
- `GET /api/businesses/category/{category}` - Filter by category
- `POST /api/businesses` - Create business (authenticated)
- `PUT /api/businesses/{id}` - Update business (authenticated)
- `DELETE /api/businesses/{id}` - Delete business (authenticated)

### Post Endpoints

- `GET /api/posts/business/{businessId}` - Get posts by business
- `POST /api/posts` - Create post (authenticated)
- `POST /api/posts/{id}/like` - Like post (authenticated)
- `DELETE /api/posts/{id}/like` - Unlike post (authenticated)

### Comment Endpoints

- `GET /api/comments/business/{businessId}` - Get comments by business
- `POST /api/comments` - Create comment (authenticated)
- `DELETE /api/comments/{id}` - Delete comment (authenticated)

### Promotion Endpoints

- `GET /api/promotions/business/{businessId}` - Get promotions
- `POST /api/promotions` - Create promotion (authenticated)

See [backend/README.md](backend/README.md) for complete API documentation.

## Environment Variables

### Backend
| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL URL | `jdbc:postgresql://localhost:5432/businessdirectory` |
| `DATABASE_USERNAME` | Database username | `postgres` |
| `DATABASE_PASSWORD` | Database password | `postgres` |
| `JWT_SECRET` | JWT signing key | (change in production) |
| `CORS_ORIGINS` | Allowed CORS origins | `http://localhost:3000` |

### Frontend
| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8080/api` |

## Development

### Backend Development
The backend uses Spring Boot DevTools for automatic restart. Simply save your Java files and the application will reload.

### Frontend Development
Next.js provides hot module replacement. Changes to React components will be reflected immediately.

## Building for Production

### Backend
```bash
cd backend
mvn clean package
java -jar target/business-directory-api-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## Deployment Checklist

- [ ] Set strong `JWT_SECRET` (at least 256 bits)
- [ ] Configure production database
- [ ] Set proper CORS origins
- [ ] Enable HTTPS
- [ ] Set up environment variables
- [ ] Configure file upload (for media)
- [ ] Set up database backups
- [ ] Configure logging
- [ ] Set up monitoring

## Future Enhancements

The following features can be added in future iterations:

1. **Media Upload**: Integrate Amazon S3 or similar for image uploads
2. **Category Filtering**: Add advanced filtering on the frontend
3. **Reviews and Ratings**: Allow users to rate and review businesses
4. **Business Claims**: Allow owners to claim existing businesses
5. **Email Notifications**: Notify users of comments, likes, etc.
6. **Social Sharing**: Share businesses on social media
7. **Maps Integration**: Show business locations on a map
8. **Analytics Dashboard**: Business owner analytics
9. **Search Optimization**: Elasticsearch integration
10. **Multi-language Support**: i18n implementation

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Support

For issues or questions, please open an issue on the GitHub repository.
