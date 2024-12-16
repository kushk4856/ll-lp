/*
========================================
? => Date Picker js
==========================================
*/

class MeetingScheduler {
  constructor() {
    this.currentDate = new Date();
    this.selectedDate = null;
    this.selectedTime = null;
    this.initializeElements();
    this.setupEventListeners();
    this.renderCalendar();
  }

  initializeElements() {
    this.prevMonthBtn = document.querySelector(".prev-month");
    this.nextMonthBtn = document.querySelector(".next-month");
    this.currentMonthElement = document.querySelector(".current-month");
    this.daysContainer = document.querySelector(".days");
    this.timeSelect = document.querySelector("#time-select");
    this.selectedDateElement = document.querySelector(".selected-date");
    this.selectedDateCalender = document.querySelector(".selected_date");
    this.selectedTimeCalender = document.querySelector(".selected_time");
    this.timeSelector = document.querySelector(".time-selector");
    this.confirmButton = document.querySelector(".confirm-button");
    this.datePicker = document.querySelector(".right-panel");
    this.sticyForm = document.querySelector(".right_sticky_form");
    this.sticyContainer = document.querySelector(".right_block");
    this.backBtn = document.getElementById("backBtnStickyForm");
  }

  setupEventListeners() {
    this.prevMonthBtn.addEventListener("click", () => this.previousMonth());
    this.nextMonthBtn.addEventListener("click", () => this.nextMonth());
    this.timeSelect.addEventListener("change", (e) =>
      this.selectTime(e.target.value)
    );

    document.querySelector(".btn-confirm").addEventListener("click", () => {
      if (this.selectedDate && this.selectedTime) {
        this.datePicker.style.display = "none";
        this.sticyForm.classList.add("active");
        this.selectedDateElement.style.color = "black";
      } else {
        this.selectedDateElement.textContent = "Please Select The Time";
        this.selectedDateElement.style.color = "red";
      }
    });

    this.backBtn.addEventListener("click", () => {
      this.datePicker.style.display = "block";
      this.sticyForm.classList.remove("active");
      this.selectedDateElement.style.color = "black";
    });
  }

  renderCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparisons

    // Disable "Previous Month" button if the current displayed month is the current month
    if (month === today.getMonth() && year === today.getFullYear()) {
      this.prevMonthBtn.disabled = true;
    } else {
      this.prevMonthBtn.disabled = false;
    }

    this.currentMonthElement.textContent = new Date(year, month).toLocaleString(
      "default",
      {
        month: "long",
        year: "numeric",
      }
    );

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    this.daysContainer.innerHTML = "";

    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
      const emptyDay = document.createElement("button");
      emptyDay.className = "day disabled";
      this.daysContainer.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayButton = document.createElement("button");
      dayButton.className = "day";
      dayButton.textContent = day;

      if (date.getDay() === 0) {
        dayButton.classList.add("disabled");
      }

      if (date.getTime() === today.getTime()) {
        dayButton.classList.add("current-day-dot");
      }

      if (date.getTime() < today.getTime()) {
        dayButton.classList.add("previous-day");
      }

      if (
        this.selectedDate &&
        date.getDate() === this.selectedDate.getDate() &&
        date.getMonth() === this.selectedDate.getMonth() &&
        date.getFullYear() === this.selectedDate.getFullYear()
      ) {
        dayButton.classList.add("selected");
      }

      dayButton.addEventListener("click", () => {
        if (date.getDay() !== 0 && date >= today) {
          this.selectDate(date);
          this.sticyContainer.style.height = "fit-content";
        }
      });

      this.daysContainer.appendChild(dayButton);
    }
  }

  selectDate(date) {
    this.selectedDate = date;
    this.renderCalendar();

    if (date.getDay() !== 0) {
      this.showTimeSelector();
    }

    this.updateSelectedDateDisplay();
    this.checkConfirmButton();
  }

  selectTime(time) {
    this.selectedTime = time;
    this.updateSelectedDateDisplay();
    this.checkConfirmButton();
  }

  showTimeSelector() {
    if (this.selectedDate) {
      const today = new Date();
      const selectedDate = new Date(this.selectedDate);
      const isToday = selectedDate.toDateString() === today.toDateString();

      this.timeSelect.innerHTML = ""; // Clear previous options

      const endTime = new Date(selectedDate);
      endTime.setHours(19, 0, 0, 0); // End at 7:00 PM

      let startTime;
      if (isToday) {
        // Get the current time
        const now = new Date();

        // Set start time to 11:00 AM
        startTime = new Date();
        startTime.setHours(11, 0, 0, 0);

        // If the current time is past 11:00 AM, round up to the next 30-minute interval
        if (now > startTime) {
          startTime = new Date(now);
          startTime.setMinutes(
            Math.ceil(startTime.getMinutes() / 30) * 30,
            0,
            0
          );
        }

        // Ensure start time does not go beyond 7:00 PM
        if (startTime > endTime) {
          startTime = endTime;
        }
      } else {
        // For future dates, start at 11:00 AM
        startTime = new Date(selectedDate);
        startTime.setHours(11, 0, 0, 0);
      }

      if (startTime >= endTime) {
        const noTimingsOption = document.createElement("option");
        noTimingsOption.value = "";
        noTimingsOption.textContent = "No timings available today";
        this.timeSelect.appendChild(noTimingsOption);
      } else {
        while (startTime <= endTime) {
          const hours = startTime.getHours();
          const minutes = startTime.getMinutes();
          const ampm = hours >= 12 ? "PM" : "AM";
          const displayHours = hours % 12 || 12;
          const timeString = `${displayHours}:${minutes
            .toString()
            .padStart(2, "0")} ${ampm}`;

          const option = document.createElement("option");
          option.value = timeString;
          option.textContent = timeString;

          this.timeSelect.appendChild(option);

          startTime.setMinutes(startTime.getMinutes() + 30);
        }
      }

      this.timeSelector.classList.add("show");
    }
  }

  checkConfirmButton() {
    if (this.selectedDate) {
      this.confirmButton.classList.add("show");
    } else {
      this.confirmButton.classList.remove("show");
    }
  }

  updateSelectedDateDisplay() {
    if (this.selectedDate && this.selectedTime) {
      const dateString = this.selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
      this.selectedDateElement.style.color = "black";
      this.selectedDateElement.textContent = ` ${dateString} at ${this.selectedTime}`;
      this.selectedDateCalender.value = `${dateString}`;
      this.selectedTimeCalender.value = `${this.selectedTime}`;
    }
  }

  previousMonth() {
    const today = new Date();
    if (
      this.currentDate.getMonth() !== today.getMonth() ||
      this.currentDate.getFullYear() !== today.getFullYear()
    ) {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.renderCalendar();
    }
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderCalendar();
  }
}



document.addEventListener("DOMContentLoaded", () => {
    new MeetingScheduler();
});




// //? Extra JavaScript :---
// const emailInput = document.getElementById("email-input");
// const emailContainer = document.getElementById("email-container");

// emailInput.addEventListener("keyup", function (event) {
//     if (event.key === "Enter" || event.key === ",") {
//         let email = emailInput.value.trim();
//         // Remove trailing commas
//         email = email.replace(/,$/, "");

//         if (email && validateEmail(email)) {
//             addEmailChip(email);
//             updateEmailInputValue(); // Update the input field value
//             emailInput.value = "";
//         }
//         event.preventDefault();
//     }
// });

// emailContainer.addEventListener("click", function (event) {
//     if (event.target.classList.contains("close-btn")) {
//         const chip = event.target.parentElement;
//         emailContainer.removeChild(chip);
//         updateEmailInputValue(); // Update the input field value
//     }
// });

// function validateEmail(email) {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailPattern.test(email);
// }

// function addEmailChip(email) {
//     const chip = document.createElement("div");
//     chip.classList.add("email-chip");
//     chip.innerHTML = `
//         ${email}
//         <span class="close-btn">×</span>
//     `;
//     emailContainer.insertBefore(chip, emailInput);
// }

// function updateEmailInputValue() {
//     const chips = emailContainer.querySelectorAll(".email-chip");
//     const emailList = Array.from(chips).map(chip => chip.textContent.replace("×", "").trim());
//     emailInput.value = emailList.join(", ");

//     console.log(emailInput.value);
    
    
// }


// const emailInput = document.getElementById("email-input");
// const emailContainer = document.getElementById("email-container");
// const form = document.querySelector(".right_sticky_form");

// emailInput.addEventListener("keyup", function (event) {
//     if (event.key === "Enter" || event.key === ",") {
//         let email = emailInput.value.trim();
//         email = email.replace(/,$/, ""); // Remove trailing commas

//         if (email && validateEmail(email)) {
//             addEmailChip(email);
//             updateEmailInputValue(); // Update the input field value
//             emailInput.value = "";
//         }
//         event.preventDefault();
//     }
// });

// emailContainer.addEventListener("click", function (event) {
//     if (event.target.classList.contains("close-btn")) {
//         const chip = event.target.parentElement;
//         emailContainer.removeChild(chip);
//         updateEmailInputValue(); // Update the input field value
//     }
// });

// // Ensure email-input is updated before form submission
// form.addEventListener("submit", function () {
//     updateEmailInputValue(); // Update input value just before submission
// });

// function validateEmail(email) {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailPattern.test(email);
// }

// function addEmailChip(email) {
//     const chip = document.createElement("div");
//     chip.classList.add("email-chip");
//     chip.innerHTML = `
//         ${email}
//         <span class="close-btn">×</span>
//     `;
//     emailContainer.insertBefore(chip, emailInput);
// }

// function updateEmailInputValue() {
//     const chips = emailContainer.querySelectorAll(".email-chip");
//     const emailList = Array.from(chips).map(chip => chip.textContent.replace("×", "").trim());
//     emailInput.value = emailList.join(", "); // Set comma-separated emails in the input field
// }


// Select the forms
const forms = [document.querySelector(".right_sticky_form"), document.querySelector(".popupForm")];

// Add event listeners for each form
forms.forEach((form) => {
    const emailInput = form.querySelector("#email-input");
    const emailContainer = form.querySelector("#email-container");

    function handleEmailInput() {
        let email = emailInput.value.trim();
        email = email.replace(/[, ]$/, ""); // Remove trailing commas or spaces

        if (email) {
            if (validateEmail(email)) {
                addEmailChip(email, emailContainer);
                updateEmailInputValue(emailContainer, emailInput);
                emailInput.value = ""; // Clear input field
            } else {
                showTooltip(emailInput, "Invalid email format!"); // Show warning tooltip
            }
        }
    }

    // Keyup event listener for main input
    emailInput.addEventListener("keyup", function (event) {
        if (
            event.key === "Enter" ||
            event.key === "," ||
            event.key === " " ||
            emailInput.value.endsWith(",") ||
            emailInput.value.endsWith(" ")
        ) {
            handleEmailInput();
            event.preventDefault();
        }
    });

    // Blur event listener for creating chips when clicking outside the input
    emailInput.addEventListener("blur", function () {
        handleEmailInput(); // Process the input when clicking outside
    });

    // Click event listener for close buttons
    emailContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("close-btn")) {
            const chip = event.target.parentElement; // Get the chip element
            emailContainer.removeChild(chip); // Remove the chip
            // updateEmailInputValue(emailContainer, emailInput); // Update input value
        }
    });

    // Blur event listener for validating edited chips
    emailContainer.addEventListener(
        "blur",
        function (event) {
            if (event.target.classList.contains("email-chip")) {
                const email = event.target.textContent.replace("×", "").trim();

                if (validateEmail(email)) {
                    // Valid email: Keep the chip
                    event.target.innerHTML = `${email} <span class="close-btn">×</span>`; 
                    event.target.classList.remove("invalid-email");
                } else {
                    // Invalid email: Remove the chip
                    emailContainer.removeChild(event.target);
                }
                // updateEmailInputValue(emailContainer, emailInput); // Update input field
            }
        },
        true
    );

    // Keydown event listener for finishing edits with Enter
    emailContainer.addEventListener("keydown", function (event) {
        if (event.target.classList.contains("email-chip") && event.key === "Enter") {
            event.target.blur(); // Trigger blur for validation
            event.preventDefault();
        }
    });

    form.addEventListener("submit", function () {
        updateEmailInputValue(emailContainer, emailInput);
    });
});

// Validate email format
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Add an email chip to the container
function addEmailChip(email, emailContainer) {
    const chip = document.createElement("div");
    chip.classList.add("email-chip");
    chip.setAttribute("contenteditable", "true"); // to Make chip editable
    chip.innerHTML = `
        ${email}
        <span class="close-btn">×</span>
    `;
    emailContainer.prepend(chip);
}

// Update the email input value with all chips
function updateEmailInputValue(emailContainer, emailInput) {
    const chips = emailContainer.querySelectorAll(".email-chip");
    const emailList = Array.from(chips)
        .filter((chip) => validateEmail(chip.textContent.replace("×", "").trim())) // Ensure only valid emails
        .map((chip) => chip.textContent.replace("×", "").trim());

    // Only update the input value if there are valid emails; otherwise, set it to an empty string
    emailInput.value = emailList.length > 0 ? emailList.join(", ") : "";
}

// Show a tooltip with a warning message
function showTooltip(inputElement, message) {
    const existingTooltip = inputElement.parentElement.querySelector(".tooltip");
    if (existingTooltip) existingTooltip.remove();

    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.textContent = message;

    inputElement.parentElement.appendChild(tooltip);
    tooltip.style.top = `${inputElement.offsetTop + inputElement.offsetHeight}px`;
    tooltip.style.left = `${inputElement.offsetLeft}px`;

    setTimeout(() => {
        if (tooltip.parentElement) tooltip.remove();
    }, 3000);
}
