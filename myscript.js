(function () {
    'use strict';

    const reservedSeats = {
        record1: {
            seat: "b19",
            owner: {
                fname: "Joe",
                lname: "Smith"
            }
        },
        record2: {
            seat: "b20",
            owner: {
                fname: "Joe",
                lname: "Smith"
            }
        },
        record3: {
            seat: "b21",
            owner: {
                fname: "Joe",
                lname: "Smith"
            }
        },
        record4: {
            seat: "b22",
            owner: {
                fname: "Joe",
                lname: "Smith"
            }
        }
    };

    const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'];
    const left = document.querySelector('#left');
    const middle = document.querySelector('#middle');
    const right = document.querySelector('#right');
    let seatsNumberCount = 1;
    rows.forEach(row => {
        left.innerHTML += `<div class="label">${row.toUpperCase()}</div>`;
        for (let k = 0; k < 3; k++) {
            left.innerHTML += `<div class="a" id="${row + seatsNumberCount}">${seatsNumberCount}</div>`;
            seatsNumberCount++;
        }
        for (let k = 0; k < 9; k++) {
            middle.innerHTML += `<div class="a" id="${row + seatsNumberCount}">${seatsNumberCount}</div>`;
            seatsNumberCount++;
        }
        for (let k = 0; k < 3; k++) {
            right.innerHTML += `<div class="a" id="${row + seatsNumberCount}">${seatsNumberCount}</div>`;
            seatsNumberCount++;
        }
        right.innerHTML += `<div class="label">${row.toUpperCase()}</div>`;
    })

    const checkReservations = () => {
        for (const key in reservedSeats) {
            if (reservedSeats.hasOwnProperty(key)) {
                document.querySelector(`#${reservedSeats[key].seat}`).className = 'r';
                document.querySelector(`#${reservedSeats[key].seat}`).innerHTML = 'R';
            }
        }
    }
    checkReservations();

    const clickOnSeat = () => {
        const seats = document.querySelectorAll('.a');
        for (let seat of seats) {
            seat.addEventListener('click', () => {
                selectSeat(seat);
            })
        }
    }

    let seatsArray = [];
    const selectSeat = seat => {
        const seatId = seat.id;
        if (!document.getElementById(seatId).classList.contains('r')) {
            if (seatsArray.includes(seatId)) {
                const ind = seatsArray.indexOf(seatId);
                seatsArray.splice(ind, 1);
                seat.className = 'a';
            } else if (!seatsArray.includes(seatId)) {
                seatsArray.push(seatId);
                seat.className = 's';
            }
            manageConfirmationForm();
        }
    }
    clickOnSeat();

    const reservationBtn = document.querySelector('#reserve');
    const reservationForm = document.querySelector('#resform');
    const cancelReservationForm = document.querySelector('#cancel');
    reservationBtn.addEventListener('click', event => {
        event.preventDefault();
        reservationForm.style.display = 'block';
    })
    cancelReservationForm.addEventListener('click', event => {
        event.preventDefault();
        reservationForm.style.display = 'none';
    })

    function manageConfirmationForm() {
        if (seatsArray.length > 0) {
            document.querySelector('#confirmres').style.display = 'block';
            if (seatsArray.length > 1) {
                const seatsString = seatsArray.toString().replace(/,/g, ', ').replace(/,(?=[^,]*$)/, ' and');
                document.querySelector('#selectedseats').innerHTML = `You have selected: ${seatsString} seats`;
            } else {
                document.querySelector('#selectedseats').innerHTML = `You have selected: ${seatsArray[0]} seat`;
            }
        } else {
            document.querySelector('#confirmres').style.display = 'none';
            document.querySelector('#selectedseats').innerHTML = 'You need to select some seats to reserve.<br><a href="#" id="error">Close</a> this dialog box and pick at least one seat.';
            document.querySelector('#error').addEventListener('click', event => {
                event.preventDefault();
                reservationForm.style.display = 'none';
            })
        }
    }

    manageConfirmationForm();

    document.querySelector('#confirmres').addEventListener('submit', event => {
        processReservation();
        event.preventDefault();
    });

    function processReservation() {
        const hardCodeRecords = Object.keys(reservedSeats).length;
        const fname = document.querySelector('#fname').value;
        const lname = document.querySelector('#lname').value;
        let counter = 1;
        let nextRecord = '';
        seatsArray.forEach(seat => {
            document.querySelector(`#${seat}`).className = 'r';
            document.querySelector(`#${seat}`).innerHTML = "R";
            nextRecord = `record${hardCodeRecords + counter}`;
            reservedSeats[nextRecord] = {
                seat: seat,
                owner: {
                    fname: fname,
                    lname: lname
                }
            }
            counter++;
        })
        reservationForm.style.display = 'none';
        seatsArray = [];
        manageConfirmationForm();
        console.log(reservedSeats);
    }

})();