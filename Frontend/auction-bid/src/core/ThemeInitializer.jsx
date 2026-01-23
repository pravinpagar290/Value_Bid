import { useEffect } from "react";
import { useSelector } from "react-redux";

const ThemeInitializer = () => {
  const theme = useSelector(state => state.theme.mode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return null;
};

export default ThemeInitializer;
