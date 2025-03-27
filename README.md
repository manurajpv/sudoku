# Sudoku App

This is a Sudoku game built with **React**, **TypeScript**, and **Vite**. It provides a fun and interactive way to play Sudoku with features like difficulty selection, a timer, and score tracking.


## Features

- **Difficulty Levels**: Choose between Easy, Medium, and Hard levels.
- **Timer**: Track how long it takes to solve the puzzle.
- **Score Tracking**: View your previous game scores.
- **Theme Toggle**: Switch between light and dark themes.
- **Responsive Design**: Optimized for various screen sizes.

#### Check out the [Demo](https://sudoku-bt9u.onrender.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/manurajpv/sudoku.git
   cd sudoku
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the App

- Start the development server:
  ```bash
  npm run dev
  # or
  yarn dev
  ```

- Open your browser and navigate to `http://localhost:5173`.

### Building for Production

- Build the app:
  ```bash
  npm run build
  # or
  yarn build
  ```

- Preview the production build:
  ```bash
  npm run preview
  # or
  yarn preview
  ```

### Linting

- Run ESLint to check for code issues:
  ```bash
  npm run lint
  # or
  yarn lint
  ```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── context/          # React context for managing game state
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── types/            # TypeScript type definitions
├── App.tsx           # Main application component
├── main.tsx          # Entry point of the app
└── index.css         # Global styles
```

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **TypeScript**: Strongly typed JavaScript.
- **Vite**: Fast build tool for modern web projects.
- **Tailwind CSS**: Utility-first CSS framework.
- **ShadCN**: Accessible UI primitives.
- **Lucide Icons**: Icon library for React.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
