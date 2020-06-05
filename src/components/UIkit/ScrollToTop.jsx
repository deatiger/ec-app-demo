import { useEffect } from 'react';
import {useSelector} from "react-redux";

const ScrollToTop = () => {
    const selector = useSelector((state) => state);
    const pathname = selector.router.location.pathname
    const search = selector.router.location.search

    // Update after changing path or query
    useEffect(() => {
        try {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        } catch (error) {
            // just a fallback for older browsers
            window.scrollTo(0, 0);
        }
    }, [pathname, search]);

    return null;
};

export default ScrollToTop