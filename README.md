# BetChess

React-Chessboard for the UI - https://www.npmjs.com/package/react-chessboard

Chess.js for the engine - https://github.com/jhlywa/chess.js

Stockfish for the AI (In Progress) - https://github.com/nmrugg/stockfish.js

Backend - https://supabase.com/

Sockets (In Progress)

Payments (In Progress)

# Learning Log (BackEnd)

- [x] Install Supabase for Backend
- [x] Set up example login under /testing
- [x] Can Register/Login with email
- [x] Manage to redirect email auth to /emailconfirmed using `redirectTo=`
- [x] Merge my backend login into frontend /login 
- [ ] Add Error message for password not correct
- [ ] Merge my backend register into frontend /register 
- [ ] Start showing the Logged In with username on all pages 

# Learning Log (FrontEnd)

**=== Index Page ===**

- [x] Change Background Colour to Grey. Change `global.css` using tailwind or seperate pages `bg-slate-500`
- [x] Add an image behind text. Add the image above the text in the same div to be placed above
- [x] Add Button over image. Adds a simple button via tailwind `<button className="bg-teal-800/90>`
- [x] Add 2nd Button over image. Needed container `relative w-x h-x` and `flex-col` and `absolute inset-0`
- [x] Seperate Button Components. Removed `<Button>` Used `<Link>` and declared type `Props{}` with strings
- [x] Add Bigger Button top center. Dynamic variables for button added `${colour} ${hover} ${textsize}`
- [x] Add Text top left with URL. Div taken out of root and seperated 
- [x] Layout Update by Marty. Split into comps, added `flex-grow`and split into two border bars and 3 flexs
- [x] Add Horse Image to left of chessboard. `w-11/12` to set size to bring it in
- [x] Add Signup/Login button below that. Added `flex-col` outside div for buttons and some `<br>`'s
- [x] Add Title text to right. Added "Play Chess, Win Money" and a list below it
- [x] Add mini pawn icons. Inserted each mini icon next to each dot point above bottomBar
- [x] Add Settings Icon Top right. Added into the Topbar a simple top right image.

**=== Cheating Policy Page ===**

- [x] Installed Tailwind Typography Plugin 
- [x] Set a `border`, `drop-shadow-xl` and used `mx-auto` to squish it in and inside `px-32` 
- [x] Set Main Text **(Done)**
- [x] Used `<ul>` and `<li>` for dotted lists 
- [x] Used `<blockquote>` for qouted FAQ  
- [x] Used `<br />` for line breaks

**===Register Page===**

- [x] Used grid to line up inputs `grid grid-cols-3 gap-3`
- [x] Input Username, Register using `<input>`  
- [x] Added hyperlink to CheatingPolicy page `<a href>` 
- [x] Added checkbox with `<input type="checkbox"`  

**=== Login Page ===** 

- [x] Login Form
- [x] Basically Same as Register Page

**=== Cash Game Select Page ===** 

- [x] Make grid with different games
- [x] Made 2x2 grid for main layout 
- [x] Text is in 2 left squares, and 3x3 grids in right squares
- [x] `grid-cols-3 gap-2` Used this for main 
- [x] Learned to use `col-start-2` for forcing layout to certain spot 
- [x] Add Buttons to the selects 
- [x] Make Buttons each selectable
- [x] Each button inherits its insertText for a usestate `settextholder(text)` 
- [x] Play Game Button only appears if both usestates not null `{highlightedButton !== ""`
- [x] Change text colour for selected games
- [x] Uses React hooks to store the data for the next pages

**=== Fun Game Select Page ===** 

- [x] Only 1 grid*
- [x] Used an Empty `<div>` for top left of a 2x2 grid
- [x] Can Select game mode and begin game*
- [x] Button only appears if mode selected

**=== Billing Info Page ===** 

- [ ] Adding forms **(In Progress)**


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

