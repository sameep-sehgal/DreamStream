# DreamStream

DreamStream is a live streaming app that uses RTMP server for video rendering and JSON server to store current streams.

## Prerequisites

Node.js

## Installation

Clone the repository.

```bash
git clone https://github.com/sameep-sehgal/DreamStream
```

Install all the dependencies for react app.

```bash
npm install
```

Install all the dependencies for RTMP server and JSON server.

```bash
cd apis
npm install
cd ../RTMPServer
npm install
```

## Usage

Start all the servers

```bash
npm start
cd apis
npm start
cd ../RTMPServer
npm start
```
RTMP server started on port 8000.

JSON server started on port 3001.

React server started on port 3000.


