import apartmentsData from '~/data/data.json';

const fetchApartment = async (id) => {
    const data = apartmentsData.find((apt) => apt.id === id);
    return data;
};


export default fetchApartment;