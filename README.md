# 2018frcFieldSim
Field visualization and real-time robot position tracking for FRC Power Up

## Installation
You'll need [pynetworktables2js](https://github.com/robotpy/pynetworktables2js) to use this.

0. Install Python.
1. Install the above package for Python.
2. Navigate to the directory containing this project.
3. Start the server using `serve.cmd`:

  > To just serve files without a robot, run `serve`. 
 
  > To connect the server to your robot, run (for example) `serve --robot 10.13.23.2` where the IP address is that of your roboRIO. 

4. Open `localhost:8888` or equivalent in your web browser of choice. My testing is done in Chrome.

Good luck!

## Features
* Square moves where robot moves
* Click and drag square or use WASD/left/right to move it
* Click the field to list the coordinates of some point on it

## Stuff to configure!
* Most of it is in `init.js`
* `index.html` is the page that loads in your browser
* `field.css` is the associated CSS
* Field maps of varying opacities are included, as is a sample of the official carpet, 'Ground Pepper'
