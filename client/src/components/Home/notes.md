- what's /app?state=register for login/signup
- it's a query param to indicate whether the user wants to register or login
- so that the app component can render the appropriate form based on the state value

- it's a mode to switch between login and signup forms

- why not two separate pages /login and /signup
- to avoid code duplication

- what do you mean by code duplication
- both login and signup forms share a lot of common code

- what's mode:
Most of the time:
Same layout
Same form container
Same logic
Just different fields / text
So conceptually:
One page, two modes

- how does it work technically
- the App component reads the state query parameter from the URL

eg: /app?state=register
- if state=register, it sets mode to 'register'
- if state=login, it sets mode to 'login'

code snippet:
const queryParams = new URLSearchParams(location.search);
const mode = queryParams.get('state') === 'register' ? 'register' : 'login';