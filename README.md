# Wooz Shortener App - backend

## Description

## Routing Shortener

| **Description** | **Route** | **Method** | **Access Token** | **Refresh Token** |
|---|---|:---:|:---:|:---:|
| User register | /auth/register | post |  |  |
| User login | /auth/login | post |  |  |
| Refresh token | /auth/refresh | post |  | require |
| User logout | /auth/remove-session | delete |  | require |
| Create Short url | /shortener | post | require |  |
| Get list url with analytic | /analytic | get | require |  |
| Get list url | /shortener | get | require |  |
| Update short url | /shortener/:url_short | patch | require |  |
| Delete short url | /shortener/:url_short | delete | require |  |
| Get Redirect url | /shortener/:url_short | get |  |  |
| Create Short url guest | /shortener/guest | post |  |  |
| Delete short url guest | /shortener/guest/:url_short/:session_id | delete |  |  |

## Shortener Algorithm (Random Text Algorithm)

The Algorithm is very simple, i have facing the problem with printing text in the array it should print the letter between ``a`` or ``b`` in the array ``["a", "b"]`` without manually select them and it should be changing everytime.

In Javascript, there object named ``Math`` that can be use for calculation, instead of using ``array[0]`` to print ``a`` letter, that can't be change every time i should find the way to get the letter automaticly.

The first i should able to get the array index automaticly, there is property called ``length`` in the ``Array`` object in javascript that can be use to get array length, so ``["a","b"].length`` will result ``2``. Cool but it's not the index.

In Javascript, array index start from 0, but for now it enough. Next i should make it into array index of array ``["a","b"]``. instead of using ``["a","b"].length-1`` that can't be automaticly change, i will use ``Math.random()``.

``random()`` is a method from ``Math`` Object. it will return number from ``0`` until ``0.999...`` so how do i get the index of that array automaticly. Tbh the first time i facing this it's hard for me. Keep in mind ``["a","b"].length`` will return ``2`` and let we call it ``arrayLength``.

To able do this, i looking for many resources untill i get the formula. Then i multiplied the  ``Math.random()`` with the ``arrayLength`` it will return from ``0.00001...`` to `1.9999...`. ok we are almost there. then still how do i get the index of that array.

Finally there are method called ``floor()`` from ``Math`` Object that will rounds down the number. Tada ✨ I got the index. with the ``Math.floor(Math.random() * ["a","b"].length)``. let me explain.

 The ``["a","b"].length`` or we has called ``arrayLength`` has value ``2``.

if ``Math.random()`` has value ``0.7824245379950878`` then multiplied by ``arrayLength``, it will result ``1.564849076`` then we can rounds down with the ``Math.floor()`` it will become ``1``.

if ``Math.random()`` has value ``0.4330327180327569`` then multiplied by ``arrayLength``, it will result ``0.866065436`` then we can rounds down with the ``Math.floor()`` it will become ``0``.

if ``Math.random()`` has value ``0.6543374656326733`` then multiplied by ``arrayLength``, it will result ``1.308674931`` then we can rounds down with the ``Math.floor()`` it will become ``1``.

if ``Math.random()`` has value ``0.2254911327358402`` then multiplied by ``arrayLength``, it will result ``0.450982265`` then we can rounds down with the ``Math.floor()`` it will become ``0``.

Very Finally i do able to print ``a`` or ``b`` automatically with this formula the finall result will be :

```javascript
const theArray = ["a","b"]
const random = Math.random()
const arrayLength = theArray.length
const theIndex = Math.floor(random * arrayLength)

console.log("random ", random)
console.log("arrayLength ", arrayLength)
console.log("theIndex ", theIndex)
console.log("result ", theArray[theIndex])
```

So for the case "Shortener Algorithm / random text" i just generate from ``A-Z`` ``a-z`` and ``0-9``. From my algorithm, then i implement to the random text with ``4`` digit letters it will have 62^4 = **14.776.336** unique string combination.

So as the ``src/wooz/wooz.service.ts`` the finall result will be.

```javascript
    const letters = generateLetter();

    // it will generate array    
    // [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    // 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    // 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a',
    // 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    // 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    // 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1',
    // '2', '3', '4', '5', '6', '7', '8', '9' ]

    let shortUrl: string = '';

    for (let index = 0; index <= 3; index++) {
      const letterIndex = Math.floor(Math.random() * letters.length);
      const newLetter = letters[letterIndex];

      shortUrl += newLetter;
    }

    return shortUrl;
```
