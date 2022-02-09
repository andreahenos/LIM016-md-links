<div align=center><h1>◎•◎•◎•◎  MD-LINKS  ◎•◎•◎•◎</h1></div>

## Index
* [About](#about)
* [Installation](#installation)
* [Guide to use](#guide-to-use)
* [Development](#development)
* [Author](#author)

## 1. About 📋

Tool that reads and analyzes files in Markdown format to verify the links they contain and report some statistics.

 **Technologies** | JavaScript, Node.js, NPM, File System, Path, Process, Git, GitHub, Jest, ESLint |
 --- | --- |
 **Version** | 1.0 |
**Dependencies** |  Marked, JSDom, DOMPurify, Axios



## 2. Installation 🔧

Type the following command in the terminal: 

``` js
npm install @andreahenos/md-links
```


## 3. Guide to use 📘

### Syntax:

> **md-links <*path*> [*option*]**

** *Path* **: 

Absolute or relative path to a file or directory.

** *Options* **:
- If you don't add an option, the `default response` is the URL, the attached text within the file, and the file path where the link was found.

<div align=center><img src="https://github.com/andreahenos/LIM016-md-links/blob/main/img/default.png" width=50% ></div>

-  **-validate**: 

The -validate option returns the URL, the attached text within the file and the path of the file where the link was found, its status and a message. The message will be 'ok' if the link works, otherwise it will be 'fail'.

 > You can access this option with `md-links <path> -validate ` or `md-links <path> -v `

<div align=center><img src="https://github.com/andreahenos/LIM016-md-links/blob/main/img/validate.png" width=50% ></div>

- **-stats**:

The result will be basic statistics about the links found. You will be able to see the total number of links and the number of unique links.

> You can access this option with `md-links <path> -stats` or `md-links <path> -s`

<div align=center><img src="https://github.com/andreahenos/LIM016-md-links/blob/main/img/stats.png" width=50% ></div>

- **-validate -stats**:

It will show basic statistics and the results of link validation.

> You can access this option with `md-links <path> -validate -stats` or `md-links <path> -v -s`

<div align=center><img src="https://github.com/andreahenos/LIM016-md-links/blob/main/img/validateAndStats.png" width=50% ></div>

- Use  `md-links -help`  or `md-links -h` to see all supported commands

<div align=center><img src="https://github.com/andreahenos/LIM016-md-links/blob/main/img/help.png" width=70% ></div>

### Other responses:

  - **"Path doesn't exists"** : When the entered path is incorrect or doesn't exist.
  - **"No links to analyze"** :

      -When the path is to an empty file or folder.

      -When the file is not Markdown.

      -When the folder contains no Markdown files.

      -When the file does not contain links.


## 4. Development 🔨
This project was developed in two parts:

### JavaScript API

<div align=center><img src="https://github.com/andreahenos/LIM016-md-links/blob/main/img/API.jpeg" width=40% ></div>

### CLI

<div align=center><img src="https://github.com/andreahenos/LIM016-md-links/blob/main/img/CLI.jpeg" width=40% ></div>

## 5. Author 👩💻
Andrea Henostroza Sánchez [( andreahenos )](https://github.com/andreahenos)

<div align=center><img src="https://c.tenor.com/OKLkZ1Um5HIAAAAC/mad-typing.gif" width=25% ></div>
