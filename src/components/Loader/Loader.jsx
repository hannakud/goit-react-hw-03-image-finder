import { Bars } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = ({ color, size }) => {
  return (
    <div className={css.Loader}>
      <Bars
        height="80"
        width="80"
        color="#303f9f"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
