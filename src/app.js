import React, { Component } from "react";
import "./app.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentXRange: [-2, 2],
      currentYRange: [-2, 2],
      mouseC1: null,
      mouseC2: null
    };
  }

  componentDidMount() {
    this.mandelbrot();

    this.refs.canvas.onmousedown = e => {
      console.log(
        e.clientX - this.refs.canvas.getBoundingClientRect().left,
        e.clientY - this.refs.canvas.getBoundingClientRect().top
      );
      this.setState({
        mouseC1: {
          x: e.clientX - this.refs.canvas.getBoundingClientRect().left,
          y: e.clientY - this.refs.canvas.getBoundingClientRect().top
        }
      });
    };

    this.refs.canvas.onmouseup = e => {
      console.log(
        e.clientX - this.refs.canvas.getBoundingClientRect().left,
        e.clientY - this.refs.canvas.getBoundingClientRect().top
      );
      this.setState(
        {
          mouseC2: {
            x: e.clientX - this.refs.canvas.getBoundingClientRect().left,
            y: e.clientY - this.refs.canvas.getBoundingClientRect().top
          }
        },
        () => {
          let c1 = this.convertCoordinate(this.state.mouseC1);
          let c2 = this.convertCoordinate(this.state.mouseC2);

          this.setState(
            {
              currentXRange: [
                c1.x < c2.x ? c1.x : c2.x,
                c1.x > c2.x ? c1.x : c2.x
              ],
              currentYRange: [
                c1.y < c2.y ? c1.y : c2.y,
                c1.y > c2.y ? c1.y : c2.y
              ]
            },
            () => {
              console.log(this.state.currentXRange, this.state.currentYRange);
              this.mandelbrot();
            }
          );
        }
      );
    };
  }

  drawPoint = (x, y, color) => {
    const ctx = this.refs.canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
  };

  convertCoordinate = c => {
    return {
      x:
        ((this.state.currentXRange[1] - this.state.currentXRange[0]) *
          (c.x - this.refs.canvas.width / 2)) /
          this.refs.canvas.width +
        (this.state.currentXRange[0] + this.state.currentXRange[1]) / 2,
      y:
        -(
          (this.state.currentYRange[1] - this.state.currentYRange[0]) *
          (c.y - this.refs.canvas.height / 2)
        ) /
          this.refs.canvas.height +
        (this.state.currentYRange[0] + this.state.currentYRange[1]) / 2
    };
  };

  inMandelbrot = (x, y) => {
    let iteration = 0;
    let max = 1000;
    let initX = 0;
    let initY = 0;
    let coordinate = this.convertCoordinate({ x, y });
    let real = coordinate.x;
    let imaginary = coordinate.y;

    while (Math.pow(initX, 2) + Math.pow(initY, 2) <= 4 && iteration < max) {
      let newX = Math.pow(initX, 2) - Math.pow(initY, 2) + real;
      initY = 2 * initY * initX + imaginary;
      initX = newX;
      iteration++;
    }

    return iteration;
  };

  mandelbrot = () => {
    for (let i = 0; i < this.refs.canvas.height; i++) {
      for (let j = 0; j < this.refs.canvas.width; j++) {
        //convert x and y to be out of 2
        //throw x and y in function that determines if x and y are in mandelbrot
        if (this.inMandelbrot(i, j) === 1000) {
          this.drawPoint(i, j, "black");
        } else {
          this.drawPoint(
            i,
            j,
            `hsl(270,100%, ${0.3 * this.inMandelbrot(i, j)}%`
          );
        }
      }
    }
  };

  render() {
    return (
      <>
        <div id="header">Mandelbrot</div>
        <div className="center">
          <canvas ref="canvas" height={1000} width={1000}></canvas>
        </div>
      </>
    );
  }
}
