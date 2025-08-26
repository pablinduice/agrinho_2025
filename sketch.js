let cityBuildings = [];
let countryElements = [];
let isMoving = false;
let movingElement = null;
let currentPosition = null;

function setup() {
  createCanvas(800, 400);
  
  // Criando prédios da cidade
  for (let i = 0; i < 5; i++) {
    cityBuildings.push(new Building(100 + i * 150, 100, 50, 200));
  }
  
  // Criando árvores e animais do campo
  for (let i = 0; i < 5; i++) {
    countryElements.push(new Tree(150 + i * 150, 300));
  }
}

function draw() {
  background(220);
  
  // Dividindo a tela em dois: esquerda para a cidade, direita para o campo
  stroke(0);
  line(width / 2, 0, width / 2, height);
  
  // Desenhando cidade
  fill(150);
  for (let b of cityBuildings) {
    b.display();
  }
  
  // Desenhando campo
  fill(0, 255, 0);
  for (let e of countryElements) {
    e.display();
  }
  
  // Se houver um elemento sendo movido, desenha ele na posição do mouse
  if (isMoving && movingElement != null) {
    movingElement.x = mouseX;
    movingElement.y = mouseY;
    movingElement.display();
  }
}

function mousePressed() {
  // Verificando se o clique foi em um prédio da cidade ou em uma árvore do campo
  if (mouseX < width / 2) {
    for (let b of cityBuildings) {
      if (b.isMouseInside(mouseX, mouseY)) {
        isMoving = true;
        movingElement = b;
        currentPosition = createVector(b.x, b.y);
      }
    }
  } else {
    for (let e of countryElements) {
      if (e.isMouseInside(mouseX, mouseY)) {
        isMoving = true;
        movingElement = e;
        currentPosition = createVector(e.x, e.y);
      }
    }
  }
}

function mouseReleased() {
  // Quando o mouse for solto, o elemento retorna à sua posição inicial ou se encaixa no novo cenário
  if (isMoving) {
    if (mouseX < width / 2) {
      movingElement.x = currentPosition.x;
      movingElement.y = currentPosition.y;
    } else {
      if (movingElement instanceof Building) {
        // Coloca o prédio no campo
        countryElements.push(new Tree(movingElement.x, movingElement.y));
      } else if (movingElement instanceof Tree) {
        // Coloca a árvore na cidade
        cityBuildings.push(new Building(movingElement.x, movingElement.y, 50, 100));
      }
    }
    isMoving = false;
    movingElement = null;
  }
}

// Definindo a classe do prédio
class Building {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  
  display() {
    rect(this.x, this.y - this.h, this.w, this.h);
  }
  
  isMouseInside(mx, my) {
    return mx > this.x && mx < this.x + this.w && my > this.y - this.h && my < this.y;
  }
}

// Definindo a classe da árvore
class Tree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  display() {
    fill(34, 139, 34);
    ellipse(this.x, this.y - 20, 40, 40); // Folhas
    fill(139, 69, 19);
    rect(this.x - 10, this.y, 20, 50); // Tronco
  }
  
  isMouseInside(mx, my) {
    return mx > this.x - 20 && mx < this.x + 20 && my > this.y - 50 && my < this.y;
  }
}
