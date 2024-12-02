import PropTypes from 'prop-types';
import { useContext } from 'react';
import { CountContext } from '../context/count/CountContext';
import { UserContext } from '../context/user/UserContext';

const ButtonComp = ({ text }) => {
    const { user } = useContext(UserContext);
    const { count, setCount } = useContext(CountContext);

    return (
        <button
            style={{ color: user ? '#a1fc9f' : '#fcb9b9' }}
            onClick={() => setCount(count + 1)}
        >
            {text}
        </button>
    );
};

ButtonComp.propTypes = {
    text: PropTypes.string.isRequired,
};

export default ButtonComp;
