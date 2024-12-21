


document.addEventListener("DOMContentLoaded", function () {
  let count = 0;
  let Call_Back_NO = document.querySelector("#Call_Back_NO");
  const onLeaveCard = document.querySelector(".OnLeaveCard");
  const card = document.querySelector(".Card");

  // Make sure the OnLeaveCard is initially hidden
  onLeaveCard.style.display = "none";

  // Listen for mouseleave event at the top of the page (clientY <= 0)
  document.addEventListener("mouseleave", function (event) {
    if (event.clientY <= 0 && count === 0) {
      onLeaveCard.style.display = "flex"; // Show the OnLeaveCard
      count = 1; // Prevent showing the card again
    }
  });

  // When user clicks outside the OnLeaveCard, hide it
  document.addEventListener("click", function (event) {
    if (onLeaveCard.style.display !== "none") {
      if (!card.contains(event.target)) {
        onLeaveCard.style.display = "none";
        count = 1;
      }
    }
  });

  // No Thanks button functionality
  document.querySelector(".No_ThanksBtn").addEventListener("click", (e) => {
    e.preventDefault();
    count = 1; // Prevent the card from showing again
    onLeaveCard.style.display = "none";
  });

  // Form submission - hide OnLeaveCard and increment count
  Call_Back_NO.addEventListener("submit", (e) => {
    // e.preventDefault();  // Uncomment if you want to handle form submission with JS
    count = 1;
    onLeaveCard.style.display = "none";
  });
});

//? Number Validation :--
let User_Number = document.querySelectorAll(".User_Number");

User_Number.forEach((number_field) => {
  number_field.addEventListener("input", () => {
    if (number_field.validity.patternMismatch) {
      number_field.setCustomValidity(
        "It seems the number is invalid, Your number must start with 9, 8, 7 or 6 and it must be 10 digits only."
      );
    } else {
      number_field.setCustomValidity("");
    }
  });
});

//? Read More and less :--
document.querySelectorAll(".btn-read-more").forEach((link) => {
  link.addEventListener("click", function () {
    const hiddenItems = this.closest("ul").querySelectorAll(
      ".show-hide-remainig"
    );

    hiddenItems.forEach((item) => {
      // Toggle the display of the hidden items
      item.style.display = item.style.display === "none" ? "block" : "none";
    });

    // Toggle link text
    this.textContent =
      this.textContent === "Read More." ? "Read Less" : "Read More.";
  });
});

/*
 =========================
? => Navbar Toggle Btn
=========================
 */

const toglleBtn = document.querySelector(".toggle_icon");
const mobileMenu = document.getElementById("mobile_navbar");
const toggleImg = document.getElementById("toggle_img");

function checkActive() {
  toglleBtn.classList.toggle("toggle_icon_active");
  if (toggleImg.classList.contains("show")) {
    toggleImg.src = "./images/menu-close.svg";

    // document.body.style.overflow = "hidden";
  } else {
    toggleImg.src = "./images/menu.svg";
    // document.body.style.overflow = "unset";
  }
}

toglleBtn.addEventListener("click", () => {
  toggleImg.classList.toggle("show");
  mobileMenu.classList.toggle("active");

  checkActive();
});

document.querySelectorAll(".mobile_menu_btns .nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-link")) {
      mobileMenu.classList.remove("active");
      toggleImg.classList.remove("show");
      checkActive();
    }
  });
});

/* 
=============================================
? => Report Section Read more and less Btn
==============================================
 */

document.querySelectorAll(".read-more-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const cardBody = this.closest(".card-body");
    const fullDesc = this.previousElementSibling;
    const isExpanded = fullDesc.classList.contains("visible");

    // Toggle full description visibility
    if (isExpanded) {
      fullDesc.classList.remove("visible");
      fullDesc.classList.add("hidden");
      this.textContent = "Read More.";
    } else {
      fullDesc.classList.remove("hidden");
      fullDesc.classList.add("visible");
      this.textContent = "Read Less";
    }

    // Animate height
    const description = this.closest(".card-description");
    if (isExpanded) {
      cardBody.style.height = `${description.offsetHeight}px`;
    } else {
      cardBody.style.height = `${description.scrollHeight}px`;
    }
  });
});

// Set initial heights
document.querySelectorAll(".card-body").forEach((body) => {
  const description = body.querySelector(".card-description");
  // body.style.height = `${description.offsetHeight}px`;
});

/* 
===========================================================
? => Accordion Functionality and Load more Functionaliy
===========================================================
 */

const accordionItems = document.querySelectorAll(".accordion-item");
const loadMoreBtn = document.getElementById("load_more");
const accordion = document.getElementById("faqAccordion");
const container = document.querySelector(".accordion-container");
let openItem = 0;
let isExpanded = false;

// ------------- first accordionItem will be open initially
const firstItem = accordionItems[0];
const firstContent = firstItem.querySelector(".accordion-content");
const firstAnswer = firstItem.querySelector(".accordion-answer");
const firstIcon = firstItem.querySelector(".accordion-icon");

firstContent.style.height = firstAnswer.scrollHeight + "px";
firstAnswer.classList.add("show");
firstIcon.classList.add("rotate");

// ---Handle accordion clicks
accordionItems.forEach((item, index) => {
  const AccordianBtn = item.querySelector(".accordion-button");
  const content = item.querySelector(".accordion-content");
  const answer = item.querySelector(".accordion-answer");
  const icon = item.querySelector(".accordion-icon");

  AccordianBtn.addEventListener("click", () => {
    const isOpen = openItem === index;

    if (openItem !== null && openItem !== index) {
      const prevItem = accordionItems[openItem];
      prevItem.querySelector(".accordion-content").style.height = "0";
      prevItem.querySelector(".accordion-answer").classList.remove("show");
      prevItem.querySelector(".accordion-icon").classList.remove("rotate");
    }

    if (isOpen) {
      content.style.height = "0";
      answer.classList.toggle("show");
      icon.classList.toggle("rotate");
      openItem = null;
    } else {
      content.style.height = answer.scrollHeight + "px";
      answer.classList.toggle("show");
      icon.classList.toggle("rotate");
      openItem = index;
    }
  });
});

// ---Handle Load More
loadMoreBtn.addEventListener("click", () => {
  if (isExpanded) return;

  // Set initial height
  container.style.height = container.offsetHeight + "px";

  // Add more FAQs
  accordionItems.forEach((item, index) => {
    if (item.classList.contains("hidden_accordion")) {
      item.classList.remove("hidden_accordion");
    }
  });

  // Force reflow
  void container.offsetHeight;

  // Animate to new height
  container.style.height = accordion.offsetHeight + "px";

  // Fade in new items
  setTimeout(() => {
    document.querySelectorAll(".new-item").forEach((item) => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    });
    // loadMoreBtn.style.visibility = "hidden";
  }, 50);

  // Cleanup;
  setTimeout(() => {
    container.style.height = "auto";
    document.querySelectorAll(".new-item").forEach((item) => {
      item.classList.remove("new-item");
    });
    loadMoreBtn.style.display = "none";
  }, 500);

  isExpanded = true;
});

/* 
==========================================================
? => Modal Functionality 
========================================================== 

 */

//open modal
function openModal(modalId) {
  // document.body.style.overflow = "hidden";
  const backdrop = document.getElementById(`${modalId}-backdrop`);
  const container = document.getElementById(`${modalId}-container`);
  const modalWrapper = container.querySelector(".modal-wrapper");

  // Remove hiding class if present
  backdrop.classList.remove("hiding");
  container.classList.remove("hiding");

  // Show modal
  backdrop.classList.add("show");
  container.classList.add("show");

  // Add click event listener to the modal wrapper
  modalWrapper.addEventListener("click", (event) => {
    // If clicked element is the modal wrapper (the outer area)
    if (event.target === modalWrapper) {
      closeModal(modalId);
    }
  });
}

//close modal
function closeModal(modalId) {
  const backdrop = document.getElementById(`${modalId}-backdrop`);
  const container = document.getElementById(`${modalId}-container`);

  // Add hiding class for close animation
  backdrop.classList.add("hiding");
  container.classList.add("hiding");

  // Remove show class after animation
  setTimeout(() => {
    backdrop.classList.remove("show");
    container.classList.remove("show");
    backdrop.classList.remove("hiding");
    container.classList.remove("hiding");
    // document.body.style.overflow = "unset";
  }, 300);
}

/* 
================================================================
? => Testimonial Pagination Functionality 
================================================================
 */

// Function to show testimonials for a specific page
function renderTestimonials(page) {
  // Hide all testimonial cards
  document.querySelectorAll(".testimonial-card").forEach((card) => {
    card.style.display = "none";
  });

  // Show testimonial cards for the current page
  document
    .querySelectorAll(`.testimonial-card[data-page="${page}"]`)
    .forEach((card) => {
      card.style.display = "block";
    });

  // Update active pagination button
  document.querySelectorAll(".pagination-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-page") == page);
  });
}

// Initialize testimonials for the first page
let currentPage = 1;
renderTestimonials(currentPage);

// Handle pagination button clicks
document.querySelectorAll(".pagination-btn").forEach((button) => {
  button.addEventListener("click", function () {
    currentPage = parseInt(this.getAttribute("data-page"));
    renderTestimonials(currentPage);
  });
});

/*
==========================================
? => Intersection Observer for Sticky Div
==========================================
*/

const whoSection = document.getElementById("who-2");
const stickyDiv = document.getElementById("stickyDiv");

let lastScrollY = window.scrollY;
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;

      if (entry.isIntersecting && scrollingDown) {
        stickyDiv.style.position = "absolute";
        stickyDiv.style.top = "-628px";
      } else if (!entry.isIntersecting && !scrollingDown) {
        stickyDiv.style.position = "fixed";
        stickyDiv.style.top = "95px";
      }

      lastScrollY = currentScrollY;
    });
  },
  {
    root: null,
    threshold: 0.92,
  }
);

observer.observe(whoSection);

/* 
========================================
? => Mobile Footer will show after scroll 
==========================================
 */
window.addEventListener("scroll", () => {
  const header = document.querySelector(".register_mobile");
  // const hero = document.getElementById("hero");

  // Add or remove the 'sticky' class based on scroll position
  if (window.scrollY > 110) {
    header.style.display = "block";
  } else {
    header.style.display = "block";
  }
});

// ----------custom checkbox--------
// const checkbox = document.getElementById("checkbox");
// const checkbox1 = document.getElementById("checkbox1");

// checkbox.addEventListener("click", (e) => {
//   checkbox.classList.toggle("checked");
//   console.log(e.target);
// });
// checkbox1.addEventListener("click", (e) => {
//   checkbox1.classList.toggle("checked");
//   console.log(e.target);
// });

function validateForm() {
  var alterNums = document.getElementsByName("whats_num");

  for (var i = 0; i < alterNums.length; i++) {
    var alterNum = alterNums[i].value; // Get the value of each input field

    if (alterNum !== "") {
      var regex = /^[9876]\d{9}$/;
      if (!regex.test(alterNum)) {
        alert(
          "It seems the number is invalid. Your number must start with 9, 8, 7, or 6 and it must be 10 digits only."
        );
        return false;
      }
    }
  }

  return true;
}

// === POPUP Calendly ====

const popupOpenBtns = document.querySelectorAll(".openModal");
const calendlyPopup = document.querySelector(".popUpCalendly");
const calendlyCloseBtn = document.querySelector(".close_calendly");

popupOpenBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    calendlyPopup.style.display = "flex";
    // document.body.style.overflow = 'hidden';
  });
});

calendlyCloseBtn.addEventListener("click", () => {
  calendlyPopup.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const calendarDays = document.getElementById("popup_cal_calendar-days");
  const currentMonthDisplay = document.getElementById(
    "popup_cal_current-month"
  );
  const prevMonthBtn = document.getElementById("popup_cal_prev-month");
  const nextMonthBtn = document.getElementById("popup_cal_next-month");
  const selectedDateDisplay = document.querySelectorAll(
    ".popup_cal_selected-date"
  );
  const timeSlotContainer = document.querySelector(
    ".popup_cal_time-slots-section"
  );
  const timeDisplay = document.querySelector(".time_display");
  const calenderArea = document.querySelector(".popup_cal_right-panel");
  const nextBtns = document.querySelectorAll(".popup_cal_next-button");
  const modalForm = document.querySelector(".popupForm");
  const previousBtn = document.querySelector(".previous_btn_popup");
  const addGuestBtn = document.querySelector(".add_guest");
  const addGuestInput = document.getElementById("add_guestInput");
  const dateInput = document.querySelector(".selected_date_Input");
  const timeInput = document.querySelector(".selected_time_Input");
  const noTimeSlotDiv = document.querySelector(".no_slots_div");

  // ====== Dynamic Time Slots Generation ======
  function generateDynamicTimeSlots(selectedDate) {
    const now = new Date();
    const selected = new Date(selectedDate);
    const endTime = new Date(selected);
    endTime.setHours(19, 0, 0, 0); // End at 12:00 PM
    let currentTime = new Date(now);

    // Clear existing time slots
    timeSlotContainer.innerHTML = "";

    dateInput.value = selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    // console.log(dateInput.value);

    // Check if the selected date is today
    const isToday =
      selected.getDate() === now.getDate() &&
      selected.getMonth() === now.getMonth() &&
      selected.getFullYear() === now.getFullYear();

    if (isToday && currentTime >= endTime) {
      // If today and the current time is beyond the end time
      noTimeSlotDiv.style.display = "flex";
      timeSlotContainer.appendChild(noTimeSlotDiv);
      return; // Exit early as there are no slots to generate
    } else {
      noTimeSlotDiv.style.display = "none";
    }

    let startTime;

    // Determine the start time based on today's or a future date
    if (isToday) {
      // Get the current time
      const now = new Date();

      // Set start time to 11:00 AM
      startTime = new Date();
      startTime.setHours(11, 0, 0, 0);

      // If the current time is past 11:00 AM, round up to the next 30-minute interval
      if (now > startTime) {
        startTime = new Date(now);
        startTime.setMinutes(Math.ceil(startTime.getMinutes() / 30) * 30, 0, 0);
      }

      // Ensure start time does not go beyond 7:00 PM
      const endTime = new Date();
      endTime.setHours(19, 0, 0, 0);
      if (startTime > endTime) {
        startTime = endTime;
      }
    } else {
      // For future dates, start at 11:00 AM
      startTime = new Date(selected);
      startTime.setHours(11, 0, 0, 0);
    }

    // Generate time slots in 30-minute intervals
    while (startTime <= endTime) {
      let hours = startTime.getHours() % 12 || 12; // Convert to 12-hour format
      let minutes = startTime.getMinutes().toString().padStart(2, "0");
      const ampm = startTime.getHours() >= 12 ? "PM" : "AM";

      // Add a leading zero if the hour is a single digit
      hours = hours < 10 ? `0${hours}` : hours;

      const timeString = `${hours}:${minutes}${ampm}`;

      // Create time slot elements
      const buttonGroup = document.createElement("div");
      buttonGroup.classList.add("popup_cal_button-group");

      const timeSlotSelected = document.createElement("div");
      timeSlotSelected.classList.add("popup_cal_time-slot-selected");
      timeSlotSelected.classList.add("right_form_time_slot");
      timeSlotSelected.textContent = timeString;

      const nextButton = document.createElement("button");
      nextButton.classList.add("popup_cal_next-button");
      nextButton.textContent = "Next";

      buttonGroup.appendChild(timeSlotSelected);
      buttonGroup.appendChild(nextButton);
      timeSlotContainer.appendChild(buttonGroup);

      // Increment the time by 30 minutes
      startTime.setMinutes(startTime.getMinutes() + 30);
    }

    // Reattach event listeners to the new time slots
    const timeSelectedBtns = document.querySelectorAll(
      ".popup_cal_time-slot-selected"
    );
    const nextBtns = document.querySelectorAll(".popup_cal_next-button");

    timeSelectedBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        timeSelectedBtns.forEach((button) => button.classList.remove("active"));
        this.classList.add("active");
        timeDisplay.textContent = `${btn.textContent}`;
        timeInput.value = `${btn.textContent}`;
      });
    });

    nextBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        calenderArea.style.display = "none";
        modalForm.classList.add("active");
        previousBtn.style.display = "flex";
      });
    });
  }

  // ====== Navigation Buttons ======
  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      calenderArea.style.display = "none";
      modalForm.classList.add("active");
      previousBtn.style.display = "flex";

      // selectedDateDisplay.forEach((el, i) => {
      //   if (i === 0) {
      //     dateInput.value = `${el.textContent}`;

      //   }
      // });
    });
  });

  previousBtn.addEventListener("click", () => {
    calenderArea.style.display = "flex";
    modalForm.classList.remove("active");
    previousBtn.style.display = "none";
  });

  // ====== Add Guest Input ======
  addGuestBtn.addEventListener("click", () => {
    addGuestBtn.style.display = "none";
    addGuestInput.style.display = "flex";
  });

  // ====== Display Current Date ======
  const currentDate = new Date();
  const options = { weekday: "long", month: "short", day: "numeric",  year: "numeric" };
  selectedDateDisplay.forEach((el) => {
    el.textContent = currentDate.toLocaleDateString("en-IN", options);
    console.log( currentDate.toLocaleDateString("en-IN", options))
  });

  // ====== Calendar Variables ======
  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // ====== Render Calendar ======
  function renderCalendar() {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    currentMonthDisplay.textContent = `${months[currentMonth]} ${currentYear}`;
    calendarDays.innerHTML = "";

    // Disable previous month button if it's the current month
    const currentMonthCheck = new Date();
    if (
      currentMonth === currentMonthCheck.getMonth() &&
      currentYear === currentMonthCheck.getFullYear()
    ) {
      prevMonthBtn.disabled = true;
      prevMonthBtn.classList.add("popup_cal_disabled");
    } else {
      prevMonthBtn.disabled = false;
      prevMonthBtn.classList.remove("popup_cal_disabled");
    }

    // Add empty slots for days before the first of the month
    for (let i = 0; i < (firstDayOfMonth + 6) % 7; i++) {
      const emptyDay = document.createElement("div");
      emptyDay.classList.add("popup_cal_day", "popup_cal_disabled");
      calendarDays.appendChild(emptyDay);
    }

    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("popup_cal_day");
      dayElement.textContent = day;

      const currentDate = new Date(currentYear, currentMonth, day);
      const isBeforeToday = currentDate < new Date().setHours(0, 0, 0, 0);
      const isSunday = currentDate.getDay() === 0;

      // Disable past dates and Sundays
      if (isBeforeToday || isSunday) {
        dayElement.classList.add("popup_cal_disabled");
        if (isSunday) {
          dayElement.classList.add("popup_cal_sunday");
        }
      } else {
        dayElement.addEventListener("click", () => {
          document
            .querySelectorAll(".popup_cal_day.popup_cal_selected")
            .forEach((selectedDay) =>
              selectedDay.classList.remove("popup_cal_selected")
            );

          dayElement.classList.add("popup_cal_selected");
          const selectedDate = new Date(currentYear, currentMonth, day);
          dateInput.value = selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          });

          console.log(dateInput.value);

          selectedDateDisplay.forEach((display) => {
            display.textContent = selectedDate.toLocaleDateString("en-IN", {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric"
            });
          });

          // Regenerate time slots for the newly selected date
          generateDynamicTimeSlots(selectedDate);
        });
      }

      // Highlight and select today's date if it's selectable
      if (
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear() &&
        !isSunday
      ) {
        dayElement.classList.add("popup_cal_today");
        dayElement.classList.add("popup_cal_selected"); // Add selected class by default

        // Set the selected date display to today's date
        selectedDateDisplay.forEach((display) => {
          display.textContent = today.toLocaleDateString("en-IN", {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric"
          });
        });

        // Generate time slots for today
        generateDynamicTimeSlots(today);
      }

      calendarDays.appendChild(dayElement);
    }
  }

  prevMonthBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });

  nextMonthBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });

  // Initial render of the calendar
  renderCalendar();
});

// ====== Guest Email Management ======
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

const slider = document.getElementById("slider");
let cardWidth = slider.children[0].offsetWidth + 20; // Width of each card including margin

let intervalSpeed = 2000; // Interval speed in ms
let interval;

function startSlider() {
  interval = setInterval(() => {
    slider.style.transition = "transform 0.5s linear";
    console.log(cardWidth);
    slider.style.transform = `translateX(-${cardWidth}px) `;

    // After the transition ends, rearrange the cards
    setTimeout(() => {
      slider.style.transition = "none";
      // slider.style.transform = "transform 0.5s linear";
      slider.style.transform = "translateX(0)";
      slider.appendChild(slider.children[0]); // Move the first card to the end
    }, 500); // Match transition duration
  }, intervalSpeed);
}

startSlider();

// TOP Form Validation
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");

backBtn.addEventListener("click", () => {
  const initialSection = document.getElementById("initial-fields");
  const additionalSection = document.getElementById("additional-fields");

  additionalSection.style.transform = "translateX(100%)";
  additionalSection.style.opacity = "0";

  setTimeout(() => {
    additionalSection.style.display = "none";
    initialSection.style.display = "block";
    setTimeout(() => {
      initialSection.style.transform = "translateX(0)";
      initialSection.style.opacity = "1";
    }, 50);
  }, 500);
});

nextBtn.addEventListener("click", function () {
  const initialFields = document.querySelectorAll(
    "#initial-fields input[required]"
  );
  let isValid = true;

  // Validate required inputs
  initialFields.forEach((input) => {
    const pattern = input.getAttribute("pattern") || null;
    const regex = pattern ? new RegExp(pattern) : null;

    // Check if input is empty or doesn't match the pattern
    if (!input.value.trim() || (regex && !regex.test(input.value.trim()))) {
      isValid = false;
      input.classList.add("error"); // Add error class for feedback
      input.setAttribute("title", input.title); // Set a tooltip for guidance
    } else {
      input.classList.remove("error");
    }
  });

  // Validate optional WhatsApp Number if filled
  const whatsAppField = document.querySelector('input[name="whats_num"]');
  if (whatsAppField.value.trim()) {
    const regex = new RegExp(whatsAppField.getAttribute("pattern"));
    if (!regex.test(whatsAppField.value.trim())) {
      isValid = false;
      whatsAppField.classList.add("error");
    } else {
      whatsAppField.classList.remove("error");
    }
  }

  if (isValid) {
    // Transition to hidden fields
    const initialSection = document.getElementById("initial-fields");
    const additionalSection = document.getElementById("additional-fields");

    initialSection.style.transform = "translateX(-100%)";
    initialSection.style.opacity = "0";

    setTimeout(() => {
      initialSection.style.display = "none";
      additionalSection.style.display = "block";
      setTimeout(() => {
        additionalSection.style.transform = "translateX(0)";
        additionalSection.style.opacity = "1";
      }, 50);
    }, 500);
  } else {
    // alert(
    //   "Please ensure all required fields are filled and formatted correctly."
    // );
  }
});

// const rightSelect = document.getElementById("right_select");
// const rightOptions = document.querySelectorAll(".right_options");

// // console.log();

// rightOptions.forEach((opt) => {
//   opt.addEventListener("click", () => {
//     console.log(rightSelect);
//   });
// });
