import './styles/index.scss';
import {calendar, calendar1} from "./calendar";
import MailIcon from './assets/envelope.png';
import PhoneIcon from './assets/phone.png';
import BirthDayIcon from './assets/bd.png';
import SexIcon from './assets/sex.png';
import WebsiteIcon from './assets/website.png';
import CalendarIcon from './assets/calendar.png';
import {formatDate} from "./utils/dateFormatter";
import {fetchPersons} from "./utils/dataFetcher";

calendar.buildCalendar()
calendar1.buildCalendar()

const calendarPlaceholder = document.querySelectorAll('.far')
calendarPlaceholder.forEach(element => {
    const calendarIcon = document.createElement('img');
    calendarIcon.src = CalendarIcon;
    element.appendChild(calendarIcon)
})

const dateInput0 = document.getElementsByClassName('date-input')[0] as HTMLInputElement;
const dateInput1 = document.getElementsByClassName('date-input1')[0] as HTMLInputElement;
const dateSubmitButton = document.getElementsByClassName('form-button')[0] as HTMLButtonElement;

dateSubmitButton.addEventListener('click', async (e) => {

    if (!dateInput0.value) {
        dateInput0.classList.add('input-error')
        return;
    } else {
        dateInput0.classList.remove('input-error')
    }

    if (!dateInput1.value) {
        dateInput1.classList.add('input-error')
        return;
    }

    dateInput0.classList.remove('input-error')
    dateInput1.classList.remove('input-error')

    const cardParent = document.getElementsByClassName('cards-wrapper')[0] as HTMLDivElement;
    const loader = document.getElementsByClassName('loader-wrapper')[0];
    loader.classList.remove('loader-wrapper__hidden');
    cardParent.innerHTML = ''
    const persons = await fetchPersons(formatDate(dateInput0.value), formatDate(dateInput1.value))


    if (!persons.data.length) {
        cardParent.innerHTML = ''
        return;
    };

    // I ONLY NEED THIS TIMEOUT TO SHOW THE DELAY, I know its anti pattern ;)
    setTimeout(() => {
        persons.data.forEach((person) => {
            const elem = `
            <div class="card">
                <p class="card-subheading">${person.firstname} ${person.lastname}</p>
                <p class="card-text"><img src=${MailIcon} style="margin-right: 5px;" alt="img" />${person.email}</p>
                <p class="card-text"><img src=${PhoneIcon} style="margin-right: 5px;" alt="img" />${person.phone}</p>
                <p class="card-text"><img src=${BirthDayIcon} style="margin-right: 7px;" alt="img" />${person.birthday}</p>
                <p class="card-text"><img src=${SexIcon} style="margin-right: 13px;" alt="img" />${person.gender}</p>
                <p class="card-text"><img src=${WebsiteIcon} style="margin-right: 5px;" alt="img" />${person.website}</p>
            </div>
        `;
            loader.classList.add('loader-wrapper__hidden');
            cardParent.insertAdjacentHTML('beforeend', elem);
        })
    }, 2000)
})