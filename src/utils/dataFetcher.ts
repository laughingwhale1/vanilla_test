
interface Address {
    id: number;
    street: string;
    streetName: string;
    buildingNumber: string;
    city: string;
    zipcode: string;
    country: string;
    county_code: string;
    latitude: number;
    longitude: number;
}

interface Data {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    birthday: string;
    gender: string;
    address: Address;
    website: string;
    image: string;
}

type statusType = "OK" | 'FAIL';
type statusCode = 200 | 404 | 500;
interface BaseResponse {
    status: statusType
    code: statusCode;
    total: number;
    data: Data[];
}

export const fetchPersons = async (dateFrom: string, dateTo: string): Promise<BaseResponse> => {
    try {
        const response= await fetch(`https://fakerapi.it/api/v1/persons?_birthday_start=${dateFrom}&_birthday_end=${dateTo}`);
        return await response.json();
    } catch (e) {
        alert(`error hapenned ${e}`)
        console.log(e)
    }
}