# My App

## Description
This application includes a counter, a user data form, and a rich text editor. It demonstrates the use of React hooks, local storage, and event handling.

## Features
- Counter with increment, decrement, and reset functionality.
- User data form with fields for name, address, email, and phone.
- Rich text editor with content preview.

## Setup
1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```sh
    cd my-app
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage
1. Start the development server:
    ```sh
    npm start
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## Components
### Counter
- Located in the `App` component.
- Includes buttons to increment, decrement, and reset the counter.
- Background color changes based on the counter value.

### User Data Form
- Located in the `App` component.
- Fields for name, address, email, and phone.
- Data is saved to local storage and loaded on initial load.
- Warns about unsaved changes when navigating away.

### Rich Text Editor
- Located in the `App` component.
- Uses `JoditEditor` for rich text editing.
- Displays a preview of the content.

## Dependencies
- React
- Jodit-react
- UUID

## License
This project is licensed under the MIT License.
