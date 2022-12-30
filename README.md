# Sudoku
A sudoku game built with React

### Built With

* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
* ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
*	![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
* ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Getting Started
### Prerequisites
* npm
```
npm install npm@latest -g
```

### Installation
1. Get free API key from [https://rapidapi.com/gregor-i/api/sudoku-generator1](https://rapidapi.com/gregor-i/api/sudoku-generator1)
2. Clone the repo
```
git clone https://github.com/drew18moore/sudoku-react.git
```
3. Install npm packages
```
npm install
```
4. Create a file named <i>.env</i> in the root of the application
5. Inside of the <i>.env</i> file, paste the following:
```
VITE_BASE_URL=https://sudoku-generator1.p.rapidapi.com/sudoku
VITE_API_KEY=<YOUR_API_KEY_GOES_HERE>
```

## Usage
* If you don't want to go through the trouble of registering an API key, comment out 'newGame()' in the useEffect() in `App.tsx`

* To run the application, run the following command:
```
npm run dev
```

## Roadmap
- [ ] Implement Undo tool
- [ ] Implement Pencil tool