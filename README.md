# varbyte-printable

![NPM Version](https://img.shields.io/npm/v/varbyte-printable)
![NPM Bundle Size](https://img.shields.io/bundlephobia/minzip/varbyte-printable)
![CI Workflow](https://github.com/binhtran432k/varbyte-printable/actions/workflows/ci.yml/badge.svg)
![GitHub License](https://img.shields.io/github/license/binhtran432k/varbyte-printable)

A library for encoding variable-length bytes into a compact, printable, and
JSON/JavaScript-safe string format.

<!--toc:start-->

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [How It Works](#how-it-works)
- [Usage](#usage)
- [Development](#development)
- [References](#references)
<!--toc:end-->

## About

`varbyte-printable` is a lightweight library that encodes arrays of bytes into
a **compact, printable** format while ensuring compatibility with **JSON and
JavaScript-safe strings**.

The encoding algorithm is inspired by **Lezer** by [Marijn
Haverbeke](https://github.com/lezer-parser), borrowing key logic to achieve
efficient compression.

This project is built using:

- **Bun** for fast development and bundling.
- **oxc-transform** for isolated TypeScript declaration generation.

## Features

- **Compact Encoding**: Reduces byte array size.
- **Printable Output**: Ensures all characters are JSON-safe.
- **JavaScript-Friendly**: Compatible with JavaScript strings.

## Installation

You can install `varbyte-printable` using:

```sh
bun add varbyte-printable
# or using npm
npm install varbyte-printable
```

## How It Works

The encoding algorithm converts numbers into groups of printable ASCII characters:

- `0xFFFF`, often used as a placeholder, is encoded as `'~'`.
- Characters from `' '` (32) to `'}'` (125), excluding `'"'` (34) and `'\\'`
  (92), represent values from **0 to 91**.
- The **first bit** in each encoded character indicates whether it is the final
  digit in the number.
- This leaves **46 additional values**, which are significant in the encoding.
- The digits in a number are ordered from **high to low significance**.

## Usage

### Encoding & Decoding Example

```ts
import {
  encodeVarbytePrintable,
  decodeVarbytePrintable,
} from "varbyte-printable";

const bytes = new Uint16Array([72, 101, 108, 1080, 111]);
const encoded = encodeVarbytePrintable(bytes);
console.log(encoded); // T!j#X#`8f#c

const decoded = decodeVarbytePrintable(Uint16Array, encoded);
console.log(decoded); // Uint16Array(5) [72, 101, 108, 1080, 111]
```

## Development

To build the project locally:

```sh
git clone https://github.com/binhtran432k/varbyte-printable.git
cd varbyte-printable
bun install
bun gen
```

To run test:

```sh
bun test
```

## References

- [Lezer by Marijn Haverbeke](https://github.com/lezer-parser) - Algorithm inspiration.
- [Bun](https://bun.sh/) - Build and runtime support.
- [oxc-transform](https://github.com/oxc-project/oxc) - TypeScript
  transformation tool.
