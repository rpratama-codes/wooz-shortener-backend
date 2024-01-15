import { Injectable } from '@nestjs/common';

@Injectable()
export class WoozService {
  private generateLetter(): Array<string> {
    const letters = [];

    for (let index = 'A'.charCodeAt(0); index <= 'Z'.charCodeAt(0); index++) {
      letters.push(String.fromCharCode(index));
    }

    for (let index = 'a'.charCodeAt(0); index <= 'z'.charCodeAt(0); index++) {
      letters.push(String.fromCharCode(index));
    }

    for (let index = '0'.charCodeAt(0); index <= '9'.charCodeAt(0); index++) {
      letters.push(String.fromCharCode(index));
    }

    return letters;
  }

  public shortUrlwithFourLetter(): string {
    const letters = this.generateLetter();

    let shortUrl: string = '';

    for (let index = 0; index <= 3; index++) {
      const letterIndex = Math.floor(Math.random() * letters.length);
      const newLetter = letters[letterIndex];

      shortUrl += newLetter;
    }

    return shortUrl;
  }
}
