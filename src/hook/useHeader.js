import { useSelector, useDispatch } from "react-redux";
import { setTitleHeader } from "reduces/current";

const useHeader = (props) => {
  const currentHeader = useSelector((state) => state.current.titleHeader);
  const dispatch = useDispatch();

  const setCurrentHeader = (title) => {
    if (title && currentHeader !== title) {
      dispatch(setTitleHeader(title));
    }
  };
  return [currentHeader, setCurrentHeader];
};

export default useHeader;
