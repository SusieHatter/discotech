function getRandomColor() {
  const hex = "0123456789ABCDEF";
  let output = "";
  for (let i = 0; i < 6; ++i) {
    output += hex.charAt(Math.floor(Math.random() * hex.length));
  }
  return "#" + output;
}

function css(element, style) {
  for (const property in style) element.style[property] = style[property];
}

const NUM_TILES = 50;
const discodeck = document.getElementById("discodeck");
const nyansEL = document.getElementById("nyans");
const nyanData = [];

function setupTiles() {
  for (let i = 0; i < NUM_TILES; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    discodeck.appendChild(tile);
  }
}

function drawTiles() {
  for (const tile of discodeck.children) {
    css(tile, {
      position: "relative",
      // "background-color": getRandomColor(),
      "z-index": Math.floor(Math.random() * 100),
      transform: `scale(${Math.random() * 4 + 1}) rotate(${
        Math.random() * 360
      }deg)`,
    });
  }
}

const checkHitBox = (object, width, height) => {
  if (
    object.x - object.padding.right >= width - object.width ||
    object.x + object.padding.left <= 0
  ) {
    object.dx *= -1;
  }
  if (
    object.y - object.padding.top >= height - object.height ||
    object.y + object.padding.bottom <= 0
  ) {
    object.dy *= -1;
  }
};

let time = 0;
const drawCats = () => {
  time++;
  [...nyansEL.children].forEach((nyan, i) => {
    const data = nyanData[i];
    checkHitBox(data, window.innerWidth, window.innerHeight);
    data.x += data.dx + Math.sin(time / 5) * 10;
    data.y += data.dy + Math.cos(time / 5) * 10;
    css(nyan, {
      position: "absolute",
      "z-index": 1000,
      bottom: `${data.y}px`,
      left: `${data.x}px`,
    });
  });
  requestAnimationFrame(drawCats);
};

function addNyan() {
  nyanData.push({
    x: Math.floor(Math.random() * (window.innerWidth - 400)),
    y: Math.floor(Math.random() * (window.innerHeight - 400)),
    padding: {
      left: 0,
      right: 10,
      top: 50,
      bottom: 50,
    },
    dx: 6,
    dy: 6,
    width: 400,
    height: 400,
  });
  nyansEL.innerHTML += `<img id="nyan" src="nyan.gif" alt="cat" />`;
}

setupTiles();
drawTiles();
setInterval(drawTiles, 410);
drawCats();
addNyan();
setInterval(addNyan, 8000);

const audioEl = document.getElementById("audio");
window.onload = function () {
  audioEl.play();
};
