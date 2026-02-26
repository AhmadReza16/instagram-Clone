# 📱 Instagram Clone

A comprehensive and complete clone of **Instagram** built with **Django REST Framework** and **Next.js** that supports all major social network features.

---

## 🌟 Key Features

### 👤 User Management System

- ✅ Secure registration and login with JWT
- ✅ User profile with profile picture
- ✅ Edit user information
- ✅ View other users' profiles
- ✅ Display followers and following counts

### 📝 Post System

- ✅ Create posts with images and captions
- ✅ Edit and delete your own posts
- ✅ Like posts
- ✅ Comment on posts
- ✅ Delete and edit comments
- ✅ Save posts for later access
- ✅ Display main feed with posts from followed users

### 📸 Stories System

- ✅ Create new stories with images
- ✅ View stories from followed users
- ✅ Track story viewers
- ✅ "My Stories" page for managing stories
- ✅ Auto-delete expired stories

### 👥 Follow System

- ✅ Follow and unfollow users
- ✅ Display follower list
- ✅ Display following list
- ✅ Direct follow from search page

### 💬 Messaging System

- ✅ Send first message to users
- ✅ Private conversations
- ✅ View message history
- ✅ Display user online status
- ✅ Follow button within messages

### 🔔 Notification System

- ✅ Like notifications
- ✅ Comment notifications
- ✅ Follow notifications
- ✅ View unread notifications

### 🔍 Search and Explore System

- ✅ Search for users
- ✅ Search for posts
- ✅ Explore page for discovering popular posts
- ✅ Search by hashtags

### ⭐ Highlights System

- ✅ Create highlights from organized stories
- ✅ Display highlights on profile
- ✅ Manage highlights

---

## 🏗️ Project Architecture

### Backend (Backend)

```
config/
├── manage.py           # Django management script
├── requirements.txt    # All Python dependencies
├── db.sqlite3          # SQLite database
├── config/             # Django settings
│   ├── settings.py     # Project configuration
│   ├── urls.py         # Main routes
│   ├── wsgi.py         # WSGI configuration
│   └── asgi.py         # ASGI configuration
│
└── Django Apps:
    ├── users/          # User management and authentication
    ├── posts/          # Post system
    ├── comments/       # Comments on posts
    ├── likes/          # Post likes
    ├── follow/         # Follow system
    ├── stories/        # Instagram stories
    ├── messages/       # Private messaging system
    ├── notifications/  # System notifications
    ├── saved/          # Save posts
    └── search/         # Search and explore

```

### Frontend (Frontend)

```
my-instaclone/
├── package.json           # Node.js dependencies
├── tsconfig.json          # TypeScript configuration
├── next.config.ts         # Next.js configuration
├── tailwind.config.mjs    # Tailwind CSS configuration
│
├── src/
│   ├── app/               # Next.js pages (App Router)
|   |   ├──(auth)          # auth
|   |   └──(root)          # root pages
│   ├── components/        # React components
│   │   ├── comments/      # Comments
│   │   ├── highlight/     # Highlight
│   │   ├── stories/       # Stories
│   │   ├── search/        # Search
│   │   ├── messages/      # Messages
│   │   ├── posts/         # Posts
│   │   ├── profile/       # Profile
|   |   └── ...            # Other componetns
│   ├── hooks/             # Custom React Hooks
│   ├── services/          # API client
│   ├── lib/               # Helper functions
│   ├── utils/             # Utilities
│   ├── types/             # TypeScript types
│   └── styles/            # Global CSS
│
└── public/                # Static files
```

---

## 🛠️ Technologies Used

### Backend

- **Django 4.x** - Python web framework
- **Django REST Framework** - REST API
- **PostgreSQL / SQLite** - Database
- **JWT (JSON Web Token)** - Authentication
- **Django Signals** - Notifications and events
- **Pillow** - Image processing

### Frontend

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **next/image** - Image optimization

---

## 📋 Requirements

### System

- Python 3.9+
- Node.js 18+
- npm or yarn

### Python Dependencies

```
Django==4.x
djangorestframework
django-cors-headers
Pillow
python-dotenv
psycopg2-binary
```

### Node.js Dependencies

```
next@15
react@19
typescript
tailwindcss
axios
```

---

## 🚀 Quick Start

### 1️⃣ Backend Setup (Django)

#### Clone the project:

```bash
git clone https://github.com/AhmadReza16/instagram-Clone.git
cd instagram-Clone
```

#### Activate virtual environment:

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

#### Install dependencies:

```bash
cd config
pip install -r requirements.txt
```

#### Set up .env:

```bash
# config/.env
SECRET_KEY=your_secret_key_here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

#### Run migrations:

```bash
python manage.py migrate
```

#### Create superuser:

```bash
python manage.py createsuperuser
```

#### Run Django server:

```bash
python manage.py runserver
```

Django server runs at `http://127.0.0.1:8000`.

---

### 2️⃣ Frontend Setup (Next.js)

#### Install dependencies:

```bash
cd my-instaclone
npm install
```

#### Set up .env.local:

```bash
# my-instaclone/.env.local
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

#### Run Next.js server:

```bash
npm run dev
```

Next.js server runs at `http://localhost:3000`.

---

## 📡 API Endpoints

### Authentication

```
POST   /api/auth/register/          - Register new user
POST   /api/auth/login/             - User login
POST   /api/auth/refresh/           - Refresh token
POST   /api/auth/logout/            - Logout
```

### Users

```
GET    /api/users/                  - List all users
GET    /api/users/<id>/             - Get user information
PUT    /api/users/<id>/             - Update user information
GET    /api/users/<username>/profile/ - User profile
```

### Posts

```
GET    /api/posts/                  - List all posts
POST   /api/posts/                  - Create new post
GET    /api/posts/<id>/             - Get post details
PUT    /api/posts/<id>/             - Edit post
DELETE /api/posts/<id>/             - Delete post
GET    /api/posts/feed/             - Personal feed
```

### Comments

```
GET    /api/posts/<id>/comments/    - Get post comments
POST   /api/posts/<id>/comments/    - Create new comment
DELETE /api/comments/<id>/          - Delete comment
```

### Likes

```
POST   /api/posts/<id>/like/        - Like post
DELETE /api/posts/<id>/like/        - Unlike post
GET    /api/posts/<id>/likes/       - Get likers list
```

### Follow

```
POST   /api/users/<id>/follow/      - Follow user
DELETE /api/users/<id>/unfollow/    - Unfollow user
GET    /api/users/<id>/followers/   - Get followers list
GET    /api/users/<id>/following/   - Get following list
```

### Stories

```
GET    /api/stories/                - All stories from followed users
POST   /api/stories/                - Create new story
GET    /api/stories/my-stories/     - Your stories
DELETE /api/stories/<id>/           - Delete story
POST   /api/stories/<id>/view/      - Record story view
```

### Messages

```
GET    /api/messages/               - List conversations
GET    /api/messages/<user_id>/     - Messages with user
POST   /api/messages/<user_id>/     - Send new message
```

### Search

```
GET    /api/search/users/           - Search users
GET    /api/search/posts/           - Search posts
GET    /api/posts/explore/          - Explore posts
```

### Notifications

```
GET    /api/notifications/          - All notifications
GET    /api/notifications/unread/   - Unread notifications
POST   /api/notifications/<id>/read/ - Mark as read
```

---

## 🔐 Authentication

The project uses **JWT (JSON Web Token)** for authentication:

- **Access Token**: For accessing protected API endpoints
- **Refresh Token**: For refreshing access token

Every request needs the following header:

```
Authorization: Bearer <access_token>
```

---

## 🐛 Troubleshooting

### Likes not working

If likes don't work:

1. Reset database: `python manage.py migrate`
2. Refresh page
3. Check browser console

### Image upload errors

If images won't upload:

1. Check `media/` folder exists
2. Verify directory write permissions
3. Check file size limits

### CORS errors

If CORS requests are blocked:

1. Set `ALLOWED_HOSTS` in Django
2. Configure `CORS_ORIGINS_ALLOWED`

---

## 📝 Important Notes

- All images are stored in `config/media/`
- Tokens expire after 24 hours
- Stories auto-delete after 24 hours
- Notifications are auto-created by signals

---

## 🤝 Contributing

To contribute to the project:

1. Fork it
2. Create a feature branch
3. Commit your changes
4. Submit a Pull Request

---

## 📄 License

This project is licensed under the **MIT** License.

---

## 📧 Contact and Support

For questions and issues:

- 📧 Email: your-email@example.com
- 🐙 GitHub: [AhmadReza16](https://github.com/AhmadReza16)

---

## 🎯 Roadmap

- [ ] Real-time Chat with WebSocket
- [ ] Reels implementation
- [ ] Hashtag tracking
- [ ] Advanced analytics
- [ ] Mobile App (React Native)
- [ ] Better Dark/Light Mode
- [ ] Multi-language support

---

**Built with ❤️ by AhmadReza16**
