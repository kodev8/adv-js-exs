import { CountContext } from '../context/count/CountContext';
import { useContext } from 'react';
const LittleSpan = () => {
    const { count } = useContext(CountContext);
    return <span> dynamic count here {count} </span>;
};

export default LittleSpan;
