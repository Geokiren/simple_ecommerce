# Simple E-commerce

A simple e-commerce application built with Vue 3, Vite, and Pinia.

## Getting Started

To get started with this project, clone the repository and install the dependencies:
```
git clone https://github.com/your-username/simple-ecommerce.git
cd simple-ecommerce
npm install
```
You also have to create an ```.env``` file in the root directory and include the following:
```VITE_API_BASE_URL = 'https://dummyjson.com'```

## Features

* Product listing and filtering
* Product details page
* Cart management
* Sorting and ordering products

## Dependencies

* Vue 3
* Vite
* Pinia
* Vue Router
* Tailwind CSS
* vueUse

## Development

To start the development server, run:

```npm run dev```

This will start the Vite development server and make the application available at http://localhost:5173.


## Build and Deployment


To build the application for production, run:

```npm run build```


## Testing


To run the unit tests, run:

```npm run test:unit```


## Linting and Formatting


To lint and format the code, run:
```
npm run lint
npm run format
```

## Challenges

Most of my time implementing this was on styling in order to deliver a good and minimal, in my opinion UI/UX. I researched some ecommerce websites and with trial & error I finalized it. I also tried a lot of pallete variations. It was really time consuming.

The unit testing part was a bit challenging mocking the request functions. I used chatGPT and the vitest documentation to make it work.

## Bonus Features

* Added a dark & light theme combining vueUse and Tailwindcss.
* Made it responsive across resolutions using Tailwindcss with breakpoints and grid.
* Added product category, sorting filtering that has been provided by the mock server.
* Added infinite scrolling pagination using the intersectionObserver API through vueUse.
* Added image optimizations.

## What I would improve

* Check for best practices
* Improve typography
* Add more type checking to some functions
* Cache request data per request url and add an expiration time for a new request
* Add more unit tests
* Add persistance to theme changing
* More image optimizations
