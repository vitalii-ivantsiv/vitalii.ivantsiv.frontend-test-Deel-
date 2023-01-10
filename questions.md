1. Pure Component realizes shouldComponentUpdate in very basic way, so it can compare simple props but when you have a difficult props structure like a object with objects it won't be campared properly so it might break you app.

2. Because shouldComponentUpdate might accidentally block context propagation

3. 1. Lifting State Up. 2. Context 3. Redux

4. 1. shouldComponentUpdate 2. React.memo

5. React.Fragment is a special component from React that allows us to wrap and group elements and components without additional DOM tree node. Doesn't support any props exept key. When you are building list with React.
   Fragment without key it might break you app.

6. Redux.compose, withRouter from 'react-router-dom', withFormik from 'formik' (I'm not sure that i correctly understood the qustion)

7. It is a difference between error handling in callbacks and promises because async/await is more syntax sugar than a new approach. In callbacks error is always the first argument of callback, we usually should check if an 
   error exists and then handle it. For error transfer to the next handler, we should use "next()". Promises use their own approach called '.catch' this is a method for error handling that call when a promise returns with a 'reject' status. 
   (async/await use try-catch functionality). For error transfer to the next handler, we should use "throw".   

8. 2 arguments, new state object and update function. setState is async because of React rendering algorithm, React ussually waits until all components calls setState and then execute setState, it provide the best performance.

9. It depends on a specific component, but in general: understand how the component works, rename the class to function, replace setState with hooks, and replace lifecycle methods with hooks. Use React.memo instead of PureComponent

10. CSS, SCSS, Styled Component, Inline Styles, 

11. Using dangerouslySetInnerHTML={{__html: 'Server String'}}