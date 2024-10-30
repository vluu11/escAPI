# EscAPI

## Description

This project is a first-person escape room game built with a Three.js scene integrated into React. It features interactive 3D models, animations, camera controls, and object collision detection. The environment includes items like a suitcase, bookshelf, desk, book, and door, which users can interact with to solve puzzles. These puzzles reveal a passcode that unlocks the door, allowing the player to escape. Upon completing the room, the player's time is recorded and displayed on a leaderboard along with their username. Access to the game is controlled by a login system, where usernames and passwords are stored and shown alongside their completion times.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Features](#features)
- [Contributions](#contribute)
- [Tests](#tests)

## Installation

No installation required. Navigate to the deployed site.

## Usage
After signing in, the 3D scene is displayed. Once the user is logged in (loginCheck prop is true), the scene will load. Users can click on the objects to trigger animations or move around using W, A, S, D keys. The camera is controlled by the mouse once the pointer lock is enabled by clicking on the canvas.

The following 3D models and interactions are included:

- Suitcase: Click to toggle its animation.
- Bookshelf: Static object displayed with a bounding box.
- Desk: Static object displayed with a bounding box.
- Book: Click to animate the book.
- Door: Click to open or close the door.

## Credits
Developed using:
- React
- Three.js
- GLTFLoader

Developers: 
- Vuong Luu



## License
MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Features
- Interactive 3D scene with models like suitcase, bookshelf, desk, book, and door.
- Interactive puzzles
- Click-to-animate functionality for the suitcase, book, and door models.
- Basic collision detection and camera movement controls.
- User login
- Leaderboard
- Database

## How to Contribute
Contributions are welcome! Feel free to fork the repository, make your changes, and submit a pull request.

## Tests
Currently, there are no automated tests provided for the project.