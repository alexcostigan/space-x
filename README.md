# SpaceX Next.js Application

This is a small Next.js application that demonstrates the consumption of data from the SpaceX API, using TypeScript and Tailwind CSS. The application has two pages showing data from two different SpaceX API endpoints.

## Features

- **Responsive Design**: The application is fully responsive, providing a good user experience on both desktop and mobile devices.
- **TypeScript**: Ensures type safety and better development experience.
- **Tailwind CSS**: Utilized for rapid and easy styling.

## API Endpoints Used

- **Launches**: `/v4/launches`
- **Rockets**: `/v4/rockets`

## Folder Structure

- `app/`: Contains the pages and layout of the application.
- `components/`: Contains reusable React components.
- `styles/`: Contains global styles.

## Extensibility

The application is built with future extensibility in mind. New pages and components can be easily added by following the existing structure. The state management can be extended using Context API or libraries like Redux if needed for more complex state management.

## Running the Application

1. Install dependencies:

```bash
npm install
