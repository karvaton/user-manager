
function scrollSpy(selector: string, index: number): string {
    const elements: NodeListOf<Element> = document.querySelectorAll(selector);
    const element: Element = elements[index];
    
    if (element) {
        const offset: number = element.clientHeight;
        const height: number = element.scrollHeight;
        
        if (height > offset) {
            const top: number = element.clientTop;
            const scroll: number = element.scrollTop;
            return scroll > top ? "scrolled" : "scroll";
        }
    }
    return '';
}

export default scrollSpy;