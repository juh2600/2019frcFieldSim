# 2018frcFieldSim
## Field visualization and real-time robot position tracking for FRC Power Up

You'll need (pynetworktables2js)[https://github.com/robotpy/pynetworktables2js] to use this.

0. Install Python.
1. Install the above package for Python.
2. Navigate to the directory containing this project.
3. Start the server using `serve.cmd`:
3.1. To just serve files without a robot, run `serve`.
3.2. To connect the server to your robot, run (for example) `serve --robot 10.13.23.2` where the IP address is that of your roboRIO.
4. Open `localhost:8888` or equivalent in your web browser of choice. My testing is done in Chrome.

Good luck!

## Features
* Square moves where robot moves
* Click and drag robot or use WASD/left/right to move it

## Stuff to configure!
* Most of it is in `init.js`
* `index.html` is the page that loads in your browser
* `field.css` is the associated CSS
* Field maps of varying opacities are included, as is a sample of the official carpet, 'Ground Pepper'
