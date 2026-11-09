<div align="center">

<img src="public/logo.svg" alt="TravelTrucks logo" height="40" />

# TravelTrucks

**A camper rental web app: browse the catalog, filter by what you need and send a booking request in a few clicks.**

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1-5A29E4?logo=axios&logoColor=white)

</div>

---

## Overview

TravelTrucks is a front-end application for a camper rental company. Users can explore the full fleet of campervans, narrow it down by location, body type, engine and transmission, look at detailed specs, photos and reviews of each vehicle, and submit a booking request.

It is built with the **Next.js App Router**. Pages that need SEO (camper details, booking confirmation) render on the server, and interactive parts (catalog filters, reviews, booking form) run on the client with **TanStack Query** handling data fetching and caching.

## Features

- **Home page.** Hero section with a call to action that leads to the catalog.
- **Catalog with filters**
  - Search by location
  - Filter by camper form (Alcove, Panel Van, Integrated, Semi Integrated), engine (Diesel, Petrol, Hybrid, Electric) and transmission (Automatic, Manual)
  - Filter options are loaded from the API, so they always match the available data
  - "Clear filters" resets everything in one click
  - Paginated loading with a **Load More** button (infinite query), with smooth scrolling to the newly loaded results
  - A friendly "No campers found" state when nothing matches
- **Camper details page**
  - Photo gallery built with Swiper
  - Rating, location, price and description
  - Vehicle specs: form, length, width, height, tank and fuel consumption
  - Amenity badges (AC, kitchen, bathroom, TV and more)
  - User reviews with star ratings
  - Dynamic SEO metadata, plus Open Graph and Twitter cards for each camper
- **Booking form**
  - Client-side validation of name and email with inline error messages
  - Loading state while the request is being sent
  - Redirects to a confirmation page on success
- **Booking confirmation page.** A summary of the selected camper and what happens next. It is marked `noindex`.
- **Polished UX.** Loading spinners, error states, responsive layout and accessible markup (labels, fieldsets, visually hidden headings).

## Tech Stack

| Category       | Tools                                                                                  |
| -------------- | -------------------------------------------------------------------------------------- |
| Framework      | [Next.js 16](https://nextjs.org/) (App Router, Server Components)                      |
| UI             | [React 19](https://react.dev/), CSS Modules, [modern-normalize](https://github.com/sindresorhus/modern-normalize) |
| Language       | [TypeScript](https://www.typescriptlang.org/)                                          |
| Data fetching  | [TanStack Query v5](https://tanstack.com/query), [Axios](https://axios-http.com/)     |
| UI libraries   | [Swiper](https://swiperjs.com/), [React Icons](https://react-icons.github.io/react-icons/), [spinners-react](https://github.com/adexin/spinners-react) |
| Fonts          | Inter via `next/font`                                                                  |
| Code quality   | ESLint, Prettier                                                                       |

## Getting Started

### Prerequisites

- **Node.js** 20 or newer
- **npm** (or yarn, pnpm or bun)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Viktor-8888/TravelTrucks.git
cd TravelTrucks

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env   # or create .env manually (see below)

# 4. Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_API_URL=https://your-api-base-url
```

| Variable              | Description                              |
| --------------------- | ---------------------------------------- |
| `NEXT_PUBLIC_API_URL` | Base URL of the TravelTrucks backend API |

## Available Scripts

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start the development server         |
| `npm run build`  | Create an optimized production build |
| `npm run start`  | Run the production build             |
| `npm run lint`   | Lint the code with ESLint            |
| `npm run format` | Format the code with Prettier        |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx               # Root layout: font, header, providers
│   ├── page.tsx                 # Home page (hero)
│   ├── catalog/
│   │   ├── page.tsx             # Catalog route + metadata
│   │   ├── CatalogClient.tsx    # Filters, infinite list, Load More
│   │   └── [camperId]/page.tsx  # Camper details (SSR + dynamic metadata)
│   └── booking-success/page.tsx # Booking confirmation
├── components/
│   ├── BookingForm/             # Validated booking request form
│   ├── CamperCard/              # Camper preview card in the catalog
│   ├── CamperGallery/           # Swiper photo gallery
│   ├── CamperInfo/              # Name, rating, location, price
│   ├── VehicleDetails/          # Specs and amenities
│   ├── Reviews/                 # Reviews list
│   ├── Header/                  # Site navigation
│   ├── LoadingTracks/           # Catalog loading state
│   ├── NoCampersFound/          # Empty state for filters
│   └── Providers.tsx            # TanStack Query provider
├── lib/
│   ├── api.ts                   # Axios instance
│   ├── campers.ts               # API request functions
│   └── camper-labels.ts         # Human-readable labels for enums
└── types/
    └── camper.ts                # Shared TypeScript types
```

## API

The app talks to a REST API at `NEXT_PUBLIC_API_URL`:

| Method | Endpoint                               | Description                                                                   |
| ------ | -------------------------------------- | ----------------------------------------------------------------------------- |
| `GET`  | `/campers`                             | Paginated list (`page`, `perPage`, `location`, `form`, `engine`, `transmission`) |
| `GET`  | `/campers/filters`                     | Available filter options                                                      |
| `GET`  | `/campers/:id`                         | Camper details, including the gallery                                         |
| `GET`  | `/campers/:id/reviews`                 | Reviews for a camper                                                          |
| `POST` | `/campers/:id/booking-requests`        | Send a booking request (`{ name, email }`)                                    |

## Deployment

The easiest way to deploy is [Vercel](https://vercel.com/new):

1. Import the repository.
2. Add the `NEXT_PUBLIC_API_URL` environment variable.
3. Deploy.

## Author

**Viktor Shcherbyna**

- GitHub: [@Viktor-8888](https://github.com/Viktor-8888)

---

<div align="center">
If you like this project, consider giving it a ⭐ on GitHub!
</div>
