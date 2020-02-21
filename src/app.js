import React, { Component } from "react";
import "./app.css";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.refs.canvas.height);
    this.mandelbrot();
  }

  createColorPalette = () => {
    let colors = [];
  };

  drawPoint = (x, y, color) => {
    const ctx = this.refs.canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
  };

  inMandelbrot = (x, y) => {
    let iteration = 0;
    let max = 1000;
    let initX = 0;
    let initY = 0;
    let real = ((x - this.refs.canvas.width / 2) * 4) / this.refs.canvas.width;
    let imaginary =
      ((y - this.refs.canvas.height / 2) * 4) / this.refs.canvas.width;

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
          this.drawPoint(i, j, `hsl(270,100%, ${this.inMandelbrot(i, j)}%`);
        }
      }
    }
  };

  render() {
    return (
      <>
        <div id="header">Mandelbrot</div>
        <div className="center">
          <canvas ref="canvas" height={800} width={800}></canvas>
        </div>
      </>
    );
  }
}
