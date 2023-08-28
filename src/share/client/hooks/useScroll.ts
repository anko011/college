function getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
//@ts-ignore
    outer.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
//@ts-ignore
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;

}

export const useScroll = () => {

    return {
        block() {
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.position = 'fixed';
            document.body.style.paddingRight = `${getScrollbarWidth()}px`
        },
        unblock() {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.paddingRight = ``
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }
}