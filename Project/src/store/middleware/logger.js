export default store => next => action => {
    if (typeof action == 'function') {
        console.log('dispatching a function')
    } else {
        console.log('dispatching', action)
    }
    const result = next(action);
    console.log('nextState ', store.getState())
}