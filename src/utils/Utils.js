export const baseUrl = 'https://avanexa.in/brandmax/api'

export const convertToIndianCurrency = (amount) => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
}