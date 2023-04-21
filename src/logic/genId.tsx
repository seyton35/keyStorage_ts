export const genIdOfArray = (array: [{ _id: string }]): string => {
    const id = Math.random().toString(16).slice(2)
    let unique = true
    array.forEach(el => {
        const { _id } = el
        if (_id === id) {
            unique = false
        }
    })
    if (unique) return id
    else return genIdOfArray(array)
}
