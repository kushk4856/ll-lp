// First, let's handle the Meeting Scheduler class

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
    this.timeSelector_wrapper = document.querySelector(".time-select-wrapper");
    this.selectedDateElement = document.querySelector(".selected-date");
    this.selectedDateCalender = document.querySelector(".selected_date");
    this.selectedTimeCalender = document.querySelector(".selected_time");
    this.timeSelector = document.querySelector(".time-selector");
    this.timeSelectorContainer = document.querySelector(
      ".time-selector-container"
    );
    this.calendar = document.querySelector(".calendar");
    this.confirmButton = document.querySelector(".confirm-button");
    this.datePicker = document.querySelector(".right-panel");
    this.sticyForm = document.querySelector(".right_sticky_form");
    this.sticyContainer = document.querySelector(".right_block");
    this.backBtn = document.getElementById("backBtnStickyForm");
    this.timeBackBtn = document.getElementById("time_back_btn");
    this.noTimeSlotDiv = document.querySelector(".no_slots_div_sticky");
  }

  setupEventListeners() {
    this.prevMonthBtn.addEventListener("click", () => this.previousMonth());
    this.nextMonthBtn.addEventListener("click", () => this.nextMonth());

    this.selectedDateElement.textContent = this.currentDate.toLocaleDateString(
      "en-In",
      {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric"
      }
    );

    this.timeSelect.addEventListener("change", (e) => {
      const selectedTime = e.target.value;
      if (selectedTime) {
        this.selectTime(selectedTime);
        this.updateTimeSlotButtons(selectedTime);
      }
    });

    this.backBtn.addEventListener("click", () => {
      this.calendar.classList.remove("slide-out");
      this.timeSelectorContainer.classList.remove("active");
      this.sticyForm.classList.remove("active");
      this.selectedDateElement.style.color = "black";
    });
    this.timeBackBtn.addEventListener("click", () => {
      this.calendar.classList.remove("slide-out");
      this.timeSelectorContainer.classList.remove("active");
      this.sticyForm.classList.remove("active");
      this.selectedDateElement.style.color = "black";
    });
  }

  renderCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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
        dayButton.classList.add("disabled");
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
    this.selectedTime = null;
    this.renderCalendar();

    if (date.getDay() !== 0) {
      this.showTimeSelector();
    }

    this.updateSelectedDateDisplay();
  }

  selectTime(time) {
    this.selectedTime = time;
    this.updateSelectedDateDisplay();
  }

  showTimeSelector() {
    if (this.selectedDate) {
      const today = new Date();
      const selectedDate = new Date(this.selectedDate);
      const isToday = selectedDate.toDateString() === today.toDateString();
      this.selectedDateElement.textContent = selectedDate.toLocaleDateString(
        "en-IN",
        {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: 'numeric'
        }
      );

      this.timeSelect.innerHTML = "";
      this.timeSelector_wrapper.innerHTML = "";

      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Select a time";
      this.timeSelect.appendChild(defaultOption);

      const endTime = new Date(selectedDate);
      endTime.setHours(19, 0, 0, 0);

      let startTime;
      if (isToday) {
        const now = new Date();
        startTime = new Date();
        startTime.setHours(11, 0, 0, 0);

        if (now > startTime) {
          startTime = new Date(now);
          startTime.setMinutes(
            Math.ceil(startTime.getMinutes() / 30) * 30,
            0,
            0
          );
        }

        if (startTime > endTime) {
          startTime = endTime;
        }
      } else {
        startTime = new Date(selectedDate);
        startTime.setHours(11, 0, 0, 0);
      }

      if (isToday && startTime >= endTime) {
        // If today and the current time is beyond the end time
        this.noTimeSlotDiv.style.display = "flex";
        this.timeSelector_wrapper.appendChild(this.noTimeSlotDiv);
        // Exit early as there are no slots to generate
      } else {
        this.noTimeSlotDiv.style.display = "none";
      }

      if (startTime >= endTime) {
        const noTimingsOption = document.createElement("div");
        // noTimingsOption.value = "";
        noTimingsOption.textContent = "No timings available today";
        this.timeSelect.appendChild(noTimingsOption);
      } else {
        while (startTime <= endTime) {
          const hours = startTime.getHours();
          const minutes = startTime.getMinutes();
          const ampm = hours >= 12 ? "PM" : "AM";
          const displayHours = hours % 12 || 12;
          let timeString = null;
          if (displayHours < 10) {
            timeString = `0${displayHours}:${minutes
              .toString()
              .padStart(2, "0")} ${ampm}`;
          } else {
            timeString = `${displayHours}:${minutes
              .toString()
              .padStart(2, "0")} ${ampm}`;
          }

          //   const option = document.createElement("option");
          //   option.value = timeString;
          //   option.textContent = timeString;
          //   this.timeSelect.appendChild(option);

          const buttonGroup = document.createElement("div");
          buttonGroup.classList.add("popup_cal_button-group");

          const timeSlotSelected = document.createElement("div");
          timeSlotSelected.classList.add("popup_cal_time-slot-selected");
          timeSlotSelected.textContent = timeString;

          timeSlotSelected.addEventListener("click", () => {
            document
              .querySelectorAll(".popup_cal_time-slot-selected")
              .forEach((slot) => {
                slot.classList.remove("active");
              });
            timeSlotSelected.classList.add("active");
            this.timeSelect.value = timeString;
            this.selectTime(timeString);
          });

          const nextButton = document.createElement("button");
          nextButton.classList.add("popup_cal_next-button");
          nextButton.textContent = "Next";
          nextButton.addEventListener("click", () => {
            if (!timeSlotSelected.classList.contains("active")) {
              timeSlotSelected.click();
            }
            if (this.selectedDate && this.selectedTime) {
              this.timeSelectorContainer.classList.remove("active");
              this.sticyForm.classList.add("active");
            }
          });

          buttonGroup.appendChild(timeSlotSelected);
          buttonGroup.appendChild(nextButton);

          this.timeSelector_wrapper.appendChild(buttonGroup);
          startTime.setMinutes(startTime.getMinutes() + 30);
        }
      }

      this.calendar.classList.add("slide-out");
      this.timeSelectorContainer.classList.add("active");
      this.timeSelector.classList.add("show");
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
      this.selectedDateElement.textContent = `${dateString} at ${this.selectedTime}`;
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

// Email handling functionality
const forms = [
  document.querySelector(".right_sticky_form"),
  document.querySelector(".popupForm"),
];

forms.forEach((form) => {
  if (!form) return;

  const emailInput = form.querySelector("#email-input");
  const emailContainer = form.querySelector("#email-container");

  if (!emailInput || !emailContainer) return;

  function handleEmailInput() {
    let email = emailInput.value.trim();
    email = email.replace(/[, ]$/, "");

    if (email) {
      if (validateEmail(email)) {
        addEmailChip(email, emailContainer);
        updateEmailInputValue(emailContainer, emailInput);
        emailInput.value = "";
      } else {
        showTooltip(emailInput, "Invalid email format!");
      }
    }
  }

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

  emailInput.addEventListener("blur", handleEmailInput);

  emailContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("close-btn")) {
      const chip = event.target.parentElement;
      emailContainer.removeChild(chip);
    }
  });

  emailContainer.addEventListener(
    "blur",
    function (event) {
      if (event.target.classList.contains("email-chip")) {
        const email = event.target.textContent.replace("×", "").trim();
        if (validateEmail(email)) {
          event.target.innerHTML = `${email} <span class="close-btn">×</span>`;
          event.target.classList.remove("invalid-email");
        } else {
          emailContainer.removeChild(event.target);
        }
      }
    },
    true
  );

  emailContainer.addEventListener("keydown", function (event) {
    if (
      event.target.classList.contains("email-chip") &&
      event.key === "Enter"
    ) {
      event.target.blur();
      event.preventDefault();
    }
  });

  form.addEventListener("submit", function () {
    updateEmailInputValue(emailContainer, emailInput);
  });
});

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function addEmailChip(email, emailContainer) {
  const chip = document.createElement("div");
  chip.classList.add("email-chip");
  chip.setAttribute("contenteditable", "true");
  chip.innerHTML = `
        ${email}
        <span class="close-btn">×</span>
    `;
  emailContainer.prepend(chip);
}

function updateEmailInputValue(emailContainer, emailInput) {
  const chips = emailContainer.querySelectorAll(".email-chip");
  const emailList = Array.from(chips)
    .filter((chip) => validateEmail(chip.textContent.replace("×", "").trim()))
    .map((chip) => chip.textContent.replace("×", "").trim());

  emailInput.value = emailList.length > 0 ? emailList.join(", ") : "";
}

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

// Initialize the Meeting Scheduler
document.addEventListener("DOMContentLoaded", () => {
  new MeetingScheduler();
});
