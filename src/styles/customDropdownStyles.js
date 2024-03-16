export const customDropdownStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: 'transparent',
        borderColor: state.isFocused ? '#fda329' : '#d1d5db',
        borderWidth: '1.5px',
        padding: '4px',
        boxShadow: state.isFocused ? '0' : '0',
        '&:hover': {
            borderColor: state.isFocused ? '#fda329' : '#d1d5db',
        },
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : 'black',
        backgroundColor: state.isSelected ? '#fda329' : (state.isFocused ? 'lightgray' : 'white'),
        borderRadius: 'lg',
    }),
    menu: (provided) => ({
        ...provided,
        zIndex: 10000,
    }),
};
