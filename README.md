# RubiksCube
## Rubiks' Cube !

https://24seconds.github.io/rubikscube/

### This proeject is implemented only `HTML(no canvas), CSS. javascript`. No Framework is used such as React, Vue or Angular.

## Mobile View
<img src="https://imgur.com/w7xYwSj.png" width="250">
<img src="https://imgur.com/VFUwmWK.gif" width="250">

## Desktop View
<img src="https://imgur.com/lLoDLiG.jpg">


## Table of Contents

## - [Before we start](#before-we-start)
- [Basic knowledge about Cube](#basic-knowledge-about-cube)

## - [How to rotate Cube](#how-to-rotate-cube)
- [How the cube rotation works](#how-the-cube-rotation-works)
- [`Gimbal lock` problem](#gimbal-lock-problem)
- [What is `Quaternion`?](#what-is-quaternion)

## - [How to solve Cube](#how-to-solve-cube)
- [`Herbert Kociemba's` two-phase algorithm](#herbert-kociemba's-two-phase-algorithm)

## - [How to design layout in mobile and desktop view](#how-to-design-layout)
- [CSS Grid](#css-grid)

## - [Operate and Simulate!](#operate-and-simulate)
- [How to operate and simulate cube](#how-to-operate-and-simulate-cube)

## Before we start

Rubik's Cube is well-knwon puzzle. Therefore, there are some notations that helps you understand rubik's cube well.

### Basic knowledge about Cube

I'm going to use notations (no worry! it's very simple notation!) which indicates the way we rotate Rubiks' cube and which orientation should we use. 

- There are only `12` notations. `(F, R, U, B, L, D, F', R', U', B', L', D')`
- For example, let say, we rotate cube using `R` operation. That means, we rotate `Right side` of cube in `Clockwise`.
- Another example, `R'`, means `Counterclockwise` + `Right side` rotation. Becasue there are `6` faces in rubik's cube and `2` orientations

> For more information of notation, visit ['how-to-solve-a-rubix-cube` website](https://how-to-solve-a-rubix-cube.com/) and have a look notation part.
(Korean website : [큐브를 맞추는 방법](https://how-to-solve-a-rubix-cube.com/큐브를-맞추는-방/))


## How to rotate Cube

### How the cube rotation works

Imagine that you implement rubik's cube in html. How you implement cube's rotation? For me, I notice that rotation is actaully combination of two separate things.
- cube piece moves to other position.
- cube piece rotates according to its axis.

Here is an example about `F` rotation.

![Image of rotation example](https://imgur.com/zixvnDh.jpg)

The cube piece which has text 8 move to next position. While moving, cube piece rotate on the spot and it leads us to recognize that the cube is rotating correctly as we expect.

Therefore, at first, I tried to manage each cube piece state using `translate3d` and `rotate` like this. But there was problem...

```js
addRotation(addedRotatoin) {
  // ...after calculate process

  this.element.style.transform = `
    translate3d(${this.currentPosition.x}px,
    ${this.currentPosition.y}px,
    ${this.currentPosition.z}px) 
    rotateX(${newRotation.x}deg) 
    rotateY(${newRotation.y}deg) 
    otateZ(${newRotation.z}deg)`;

  this.currentRotation = newRotation;
}
```


### `Gimbal lock` problem

At first implementation, I thought rotation is just rotation. But there was a serious problem about `XYZ-coordinate` rotation, named [Gimbal lock](https://en.wikipedia.org/wiki/Gimbal_lock).

When we naively rotate some object according to X, Y or Z axis in XYZ coordinate, in certain conditions, we can not rotate object as we want because of Gimbal lock.

![](https://upload.wikimedia.org/wikipedia/commons/4/49/Gimbal_Lock_Plane.gif)

*[wikipedia: gimbal lock](https://en.wikipedia.org/wiki/Gimbal_lock)*

I googled and it seems that there is no way to solve gimbal lock but to avoid gimbal lock. I googled again and using [quaternion](https://en.wikipedia.org/wiki/Quaternion) can solve this problem.


### What is `Quaternion`?

Quaternion is a number system and it is popular when we deal with 3D things. There are two concepts of expressing 3D rotation. One is matrix and the other one is quaternion.

For example, when we talk about 3D rotation, we usually manage rotation status as matrix. If we want to rotate theta degree about x axis, then we multiply current matrix by rotation matrix. 
> More Info, check [wikipedia](https://en.wikipedia.org/wiki/Rotation_matrix)

Becasue using matrix can not avoid gimbal lock, quaternion is used. In quaternion, rotation status is expressed as like this
```
a + bi + cj + dk
```
a, b, c is real number and i, j, k is quaternion unit. 

I'm not going to explain whole things. Check [wikipedia](https://en.wikipedia.org/wiki/Quaternion) for more information.

Because of gimbal lock, I managed rotation status using `matrix3d` instead of `rotate`.

```js
addRotation(addedRotatoin) {
  // ...after calculate process

  this.element.style.transform =
    `translate3d(${xP}px, ${yP}px, ${zP}px) 
      matrix3d(${r}, 0, 0, 0, 1)`;
  
  this.currentQuaternion = newQuaternion;
}
```
To use quaternion, you need to able to convert XYZ rotation (called as euler rotation) to quaternion. Computation is quite complicated but no worry. There is good library to do this easily, named [quaternion](https://www.npmjs.com/package/quaternion). Check this library if you want.


## How to solve Cube

### `Herbert Kociemba's` two-phase algorithm

There are many ways to solve rubik's cube. In this project, to give a solution to user, [Herbert Kociemba's two-phase algorithm](http://kociemba.org/cube.htm) is used. This algorithm gives at most 22 moves in half turn metric. 

Luckily, there is javascript library which implements `two-phase algorithm`, I used [this library](https://www.npmjs.com/package/cubejs), named `cubejs`.


## How to design layout

### CSS Grid

When I start this project, I wanted to give appropriate user experience depend on their environment. So I decided to support mobile and desktop view both. Therefore, in Desktop, you can rotate Cube using either keyboard or mouse - in mouse, you can click rotation Buttons.

Also, to give better layout structure, CSS grid is used. You can check that `operation stack`'s position is changed depend on your browser width.

```css
 /* desktop view */
.cube-operation-stack-header {
  grid-area: 1 / 2 / 1 / 2;

  ...other styles
}

ul.cube-operation-stack {
  grid-column-start: 2;
  grid-row: 2 / -1;

  ...other styles
}

/* mobile view */
@media only screen and (max-width: 720px) {
  .cube-operation-stack-header {
    display: none;
  }

  ul.cube-operation-stack {
    grid-row: 4;
    grid-column: 1 / -1;

    ...other styles
  }
```

## Operate and Simulate!

### How to operate and simulate cube

In this project, https://24seconds.github.io/rubikscube/, you can use either keyboard or mouse (mouse is for mobile web).

- For keyboard, Click the screen and press one of `R, F, U, L, B, D` which is same as [rubik's cube notations]((https://how-to-solve-a-rubix-cube.com/)). To rotate in `counterclockwise`, use `shift button`. For example, R' is same as shift + R

- For mobile web view, instead of pressing keyboard, `just click buttons`. Operation mechanism is same as keyboard one.
