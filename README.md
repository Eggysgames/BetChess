# BetChess


React-Chessboard for the UI - https://www.npmjs.com/package/react-chessboard

Chess.js for the engine - https://github.com/jhlywa/chess.js

Stockfish for the AI (In Progress) - https://github.com/nmrugg/stockfish.js

Sockets (In Progress)

Payments (In Progress)


# Learning Log

**=== Index Page ===**

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
- Add Settings Icon Top right **(Done)** Added into the Topbar a simple top right image.

**=== Cheating Policy Page ===**

- Installed Tailwind Typography Plugin **(Done)** 
- Set a `border`, `drop-shadow-xl` and used `mx-auto` to squish it in and inside `px-32` **(Done)** 
- Set Main Text **(Done)**
- Used `<ul>` and `<li>` for dotted lists **(Done)** 
- Used `<blockquote>` for qouted FAQ **(Done)** 
- Used `<br />` for line breaks **(Done)** 

**===Register Page===**

- Used grid to line up inputs `grid grid-cols-3 gap-3` **(Done)** 
- Input Username, Register using `<input>` **(Done)** 
- Added hyperlink to CheatingPolicy page `<a href>` **(Done)** 
- Added checkbox with `<input type="checkbox"` **(Done)** 

**=== Login Page ===** 

- Login Form **(Done)**
- Basically Same as Register Page **(Done)**

**=== Billing Info Page ===** 

**=== Non Cash Game Select Page ===** 

**=== Cash Game Select Page ===** 




**=== Refactors===**

- Added `DefaultButton` component in StyledButton.tsx for simple ones
- Added 'items-start' to make pawns on left and wrapped images with p-1 to align
- Added 'ml-16' to align right text properly
- Added 'whitespace-nowrap' around left buttons
- Added 'max-w-none w-[350px] sm:max-w-none sm:w-[350px]  2xl:w-full' around horse image
- Horse Image set to original Dimensions - `640x480`
- Horse zooms in (Animation)

# Play

Open up localhost:3000

