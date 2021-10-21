export function createCounter() {
    let count: number = 0;
    
    return function (max: number): number {
        if (max && count === max) count = 0;
        return count++;
    }
}

export default createCounter();