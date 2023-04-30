import css from './Button.module.css';

export const Button = ({ title, handler }) => {
  return (
    <button className={css.ButtonMore} onClick={handler}>
      {title}
    </button>
  );
};
