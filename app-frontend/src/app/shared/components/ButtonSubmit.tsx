/* eslint-disable react/display-name */
import React from 'react';

const ButtonSubmit = React.forwardRef<HTMLButtonElement>((props, ref) => <button hidden type="submit" ref={ref} />);

export default ButtonSubmit;
