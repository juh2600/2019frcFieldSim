# 2018frcFieldSim
Field visualization and real-time robot position tracking for FRC Power Up

## Installation
You'll need [pynetworktables2js](https://github.com/robotpy/pynetworktables2js) to use this.

0. Install Python.
1. Install the above package for Python.
2. Download all these files and extract them (i/a) to some directory.
3. In a terminal (e.g., Command Prompt), navigate to the directory containing this project.
4. Start the server using `serve.cmd`:

  > To just serve files without a robot, run `serve`. 
 
  > To connect the server to your robot, run (for example) `serve --robot 10.13.23.2` where the IP address is that of your roboRIO. 

5. Open `localhost:8888` or equivalent in your web browser of choice. (My testing is done in Chrome, and I will never test or support another browser [unless I am convinced that I should]. Stray from the light at your own risk.)

Good luck!

## Features
* Square moves where robot moves
* Line goes where square goes
* Colors!
* Basically any pair of numbers on Network Tables can be used as coordinates for a thing, and any such thing can be traced. (Any number can also be used as a heading for said thing.)
* You can specify dynamic width and height for things too

## Stuff to configure!
* Specify trackables and traceables in `robot.js`
* `index.html` is the page that loads in your browser
* `field.css` is the associated CSS
