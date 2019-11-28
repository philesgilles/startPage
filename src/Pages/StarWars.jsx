import React, { useEffect } from "react";
import "./StarWars.css";
import Planet from "../Components/StarWars/Planet";
const StarWars = () => {
  //Start stars Canvas onLoad
  var startCanvas = () => {
    var canvas = document.getElementById("space"),
      ctx = canvas.getContext("2d"),
      w = (canvas.width = document.getElementById("starWay").offsetWidth - 4),
      h = (canvas.height = document.getElementById("starWay").offsetHeight + 3),
      // w = (canvas.width = 600),
      // h = (canvas.height = 200),
      hue = 45,
      stars = [],
      count = 0,
      maxStars = 1400;

    function assignToDiv() {
      // this kind of function you are looking for
      let dataUrl = canvas.toDataURL();

      document.getElementById("starWay").style.background =
        "url(" + dataUrl + ")";
    }
    // Thanks @jackrugile for the performance tip! https://codepen.io/jackrugile/pen/BjBGoM
    // Cache gradient
    var canvas2 = document.createElement("canvas"),
      ctx2 = canvas2.getContext("2d");
    canvas2.width = 100;
    canvas2.height = 100;
    var half = canvas2.width / 2,
      gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, "#fff");
    gradient2.addColorStop(0.1, "hsl(" + hue + ", 10%, 33%)");
    gradient2.addColorStop(0.25, "hsl(" + hue + ", 3%, 6%)");
    gradient2.addColorStop(1, "transparent");

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

    // End cache

    function random(min, max) {
      if (arguments.length < 2) {
        max = min;
        min = 0;
      }

      if (min > max) {
        var hold = max;
        max = min;
        min = hold;
      }

      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function maxOrbit(x, y) {
      var max = Math.max(x, y),
        diameter = Math.round(Math.sqrt(max * max + max * max));
      return diameter / 2;
    }

    var Star = function() {
      this.orbitRadius = random(maxOrbit(w, h));
      this.radius = random(60, this.orbitRadius) / 12;
      this.orbitX = w / 2;
      this.orbitY = h / 2;
      this.timePassed = random(0, maxStars);
      this.speed = random(this.orbitRadius) / 1000000;
      this.alpha = random(2, 10) / 10;

      count++;
      stars[count] = this;
    };

    Star.prototype.draw = function() {
      var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
        y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
        twinkle = random(50);

      if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05;
      } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05;
      }

      ctx.globalAlpha = this.alpha;
      ctx.drawImage(
        canvas2,
        x - this.radius / 2,
        y - this.radius / 2,
        this.radius,
        this.radius
      );
      this.timePassed += this.speed;
    };

    for (var i = 0; i < maxStars; i++) {
      new Star();
    }

    function animation() {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = "hsla(" + hue + ", 64%, 6%, 1)";
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";
      for (var i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
      }

      window.requestAnimationFrame(animation);
      assignToDiv();
    }

    animation();
  };
  useEffect(() => {
    console.log("start canvas");
    startCanvas();
  }, []);
  return (
    <React.Fragment>
      <div className="flex">
        <img
          src={process.env.PUBLIC_URL + "/img/starWarsLogo.png"}
          alt="Star Wars Logo"
          className="starWarsLogo"
        />
      </div>
      <div className="swHeader">
        <h3>Star Wars API</h3>
      </div>
      <div id="starWay" className="swContent flex">
        <Planet />
        {/* <div className="swContent_in">
          <p>aaaa</p>
        </div> */}
      </div>
      <div style={{ display: "none" }}>
        <canvas id="space"></canvas>
      </div>
    </React.Fragment>
  );
};

export default StarWars;
