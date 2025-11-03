import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Scroll smoothly to the top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname, search]); // pathname পরিবর্তন হলে scroll করবে

  return null;
}

export default ScrollToTop;
