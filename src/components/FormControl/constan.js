const settings = [
    {
        inputName: "Adults",
        subText: "Ages 13 or above",
        link: false,
        divider: true,
    },
    {
        inputName: "Children",
        subText: "Ages 2 - 12",
        link: false,
        divider: true,
    },
    {
        inputName: "Infants",
        subText: "Under 2",
        link: false,
        divider: true,
    },
    {
        inputName: "Pets",
        subText: "Bringing a service animal ?",
        link: true,
    },
];

const minGuest = 1;
const maxGuest = 100;
const calculateTotalGuest = (guestNumber) => {
    let guestTotal = 0;
    for (let guest in guestNumber) {
        guestTotal += guestNumber[guest];
    }
    return guestTotal;
};

export { settings, minGuest, maxGuest,calculateTotalGuest };
