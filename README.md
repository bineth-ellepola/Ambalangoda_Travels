# Ambalangoda Travels

Website for a tour company on Sri Lanka's south coast. Visitors browse tours, destinations and a photo gallery and send booking inquiries; the owner manages everything from an admin panel.

- **frontend/**: React 19 + Vite + React Router
- **backend/**: Express 5 + MongoDB (Mongoose) + Cloudinary image uploads

## Setup

1. Create `backend/.env` from `backend/.env.example` and fill in:
   - `MONGO_URI`: MongoDB Atlas connection string (database user, not your Atlas login)
   - `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET`: from the Cloudinary dashboard
   - `ADMIN_USERNAME`, `ADMIN_PASSWORD`: login for `/admin`
   - `JWT_SECRET`: any long random string
2. Install dependencies:
   ```
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. (Optional) Load sample tours and destinations:
   ```
   cd backend && npm run seed            # only fills empty collections
   cd backend && npm run seed -- --reset # replaces existing tours/destinations
   ```

## Running locally

In two terminals:

```
cd backend && npm run dev     # API on the PORT in .env (default 5000)
cd frontend && npm run dev    # site on http://localhost:5173
```

The Vite dev server proxies `/api` to the backend port read from `backend/.env`.

Admin panel: http://localhost:5173/admin (also linked in the footer).

## Customising

- Phone, WhatsApp, email, address and social links: `frontend/src/siteConfig.js`
- Colours and fonts: design tokens at the top of `frontend/src/index.css`
- Tours without an uploaded image show a coloured placeholder until you add one in the admin panel.

## API

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| POST | `/api/auth/login` | | Admin login, returns a JWT |
| GET | `/api/tours` | | List tours (`?category=`, `?featured=true`) |
| GET | `/api/tours/:id` | | Tour details |
| POST / PUT / DELETE | `/api/tours[/:id]` | admin | Manage tours (multipart, field `image`) |
| GET | `/api/discription` | | List destinations |
| POST | `/api/discription/add` | admin | Add destination (multipart, field `image`) |
| PUT / DELETE | `/api/discription/:id` | admin | Edit / delete destination |
| GET | `/api/photos` | | Gallery photos |
| POST | `/api/photos` | admin | Upload up to 20 photos (field `images`) |
| DELETE | `/api/photos/:id` | admin | Delete photo |
| POST | `/api/inquiries` | | Submit a booking inquiry |
| GET / PATCH / DELETE | `/api/inquiries[/:id]` | admin | View inquiries, change status, delete |

Admin requests send `Authorization: Bearer <token>`.

## Production build

```
cd frontend && npm run build   # outputs frontend/dist
```

If the frontend and API are hosted on different domains, build with `VITE_API_URL=https://your-api.example.com/api` and set `CLIENT_URL` in the backend `.env` to the site's URL (comma-separate multiple origins).
