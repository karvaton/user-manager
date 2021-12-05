
function scrollSpy(element?: Element): string {    
    if (element) {
        const clientHeight: number = element.clientHeight;
        const height: number = element.scrollHeight;
        
        if (height > clientHeight) {
            const top: number = element.clientTop;
            const scroll: number = element.scrollTop;
            return scroll > top ? "scrolled" : "scroll";
        }
    }
    return '';
}

export default scrollSpy;