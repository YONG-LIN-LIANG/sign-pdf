# Autograph

This is a side project created for a front-end competition in Taiwan. The project is purely front-end, focusing on implementing digital signature functionality without requiring any back-end support. It showcases the design and front-end features needed to perform and manage digital signatures effectively.

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Key Libraries and Tools](#key-libraries-and-tools)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contact](#contact)

## About the Project

[![Project Screenshot](link-to-screenshot.png)](link-to-screenshot.png)

**Autograph** is a lightweight front-end application designed to demonstrate digital signature functionality. It addresses the need for secure and straightforward signing of PDFs directly within the browser, making it ideal for environments where back-end support is unavailable or unnecessary.

The project explores intuitive design patterns and front-end techniques to simulate the behavior of digital signatures. It was initially developed for a competition to highlight innovative solutions in front-end development.

## Features
- **PDF Upload**: Allows users to upload their own PDF documents for signing.
- **Digital Signature**: Enables users to create and place digital signatures on uploaded PDFs.
- **Export Functionality**: Users can download signed PDFs directly to their devices.
- **Responsive Design**: Works seamlessly across devices of various screen sizes.

## Key Libraries and Tools
1. **React**  
   - The core library for building the user interface as a Single Page Application (SPA).  
   - Enables component-based architecture and state management.

2. **react-pdf**  
   - Facilitates rendering and viewing PDF documents in the browser.  
   - Handles PDF navigation and page rendering.

3. **fabric.js**  
   - A canvas-based library for creating and managing interactive drawing elements.  
   - Used for implementing digital signature functionality.

4. **html2canvas**  
   - Converts HTML elements into images.  
   - Enables capturing user signatures and embedding them into PDFs.

5. **jspdf**  
   - Generates and manipulates PDF documents directly on the client side.  
   - Supports embedding signatures and downloading modified PDFs.

6. **Tailwind CSS**  
   - A utility-first CSS framework for responsive and modern styling.  
   - Simplifies the creation of consistent and clean UI components.

7. **Vite**  
   - A fast and modern build tool used for bundling the React project.  
   - Provides an optimized development and production build pipeline.

8. **Jotai**  
   - A lightweight state management library for React.  
   - Manages global application state efficiently and intuitively.

9. **Docker**  
   - Used for containerizing the application to ensure consistent deployment across environments.  
   - Simplifies setting up and running the application in isolated containers.

10. **Nginx**  
   - Serves as the web server for hosting the application.  
   - Handles static assets and optimizes request routing.

11. **React Hooks**  
   - Includes `useState`, `useEffect`, and others for managing state and lifecycle events in functional components.

## Getting Started

To set up the project locally, follow these steps.

### Prerequisites
Ensure you have the following installed on your system:
- Node.js (v16 or later recommended)
- npm (Node Package Manager)

### Installation
Clone the repository and install dependencies:
```bash
# Clone the repo
git clone https://github.com/YONG-LIN-LIANG/sign-pdf.git

# Navigate to the project directory
cd sign-pdf

# Install dependencies
npm install
