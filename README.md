# BetChess


React-Chessboard for the UI - https://www.npmjs.com/package/react-chessboard

Chess.js for the engine - https://github.com/jhlywa/chess.js

Stockfish for the AI (In Progress) - https://github.com/nmrugg/stockfish.js

Sockets (In Progress)

Payments (In Progress)


# Learning Log

=== Index Page ===

- Change Background Colour to Grey **(Done)** Change `global.css` using tailwind or seperate pages `bg-slate-500`
- Add an image behind text **(Done)** Add the image above the text in the same div to be placed above
- Add Button over image **(Done)** Adds a simple button via tailwind `<button className="bg-teal-800/90>`
- Add 2nd Button over image **(Done)** Needed container `relative w-x h-x` and `flex-col` and `absolute inset-0`
- Seperate Button Components **(Done)** Removed `<Button>` Used `<Link>` and declared type `Props{}` with strings
- Add Bigger Button top center **(Done)** Dynamic variables for button added `${colour} ${hover} ${textsize}`
- Add Text top left with URL **(Done)** Div taken out of root and seperated 
- Layout Update by Marty **(Done)** Split into comps, added `flex-grow`and split into two border bars and 3 flexs
- Add Horse Image to left of chessboard **(Done)** `w-11/12` to set size to bring it in
- Add Signup/Login button below that **(Done)** Added `flex-col` outside div for buttons and some `<br>`'s
- Add Title text to right **(Done)** Added "Play Chess, Win Money" and a list below it
- Add mini pawn icons **(Done)** Inserted each mini icon next to each dot point above bottomBar

- Add Settings Icon Top right


=== Rules Page === 

- Anti-Cheat Text
- Return Button

=== Login Page === 

- Login Button
- Register Button




# Play

Open up localhost:3000

