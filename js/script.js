      let captchaText = document.querySelector('#captcha');
      let ctx = captchaText.getContext("2d");
      ctx.font = "30px Roboto";
      ctx.fillStyle = "Green";

      let userText = document.querySelector('#captchaout');
      let refreshButton = document.querySelector('#refreshButton');
      let output = document.querySelector('#output');
      let submitCaptchaButton = document.querySelector('#submitCaptcha');
      let submitActionButton = document.querySelector('#submitActionButton');
      let form = document.querySelector('.allform');

      let alphaNums = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

      function generateCaptcha() {
        let captchaArr = [];
        for (let i = 0; i < 6; i++) {
          captchaArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
        }
        return captchaArr.join('');
      }

      function drawCaptcha(captcha) {
        ctx.clearRect(0, 0, captchaText.width, captchaText.height);
        ctx.fillText(captcha, captchaText.width / 4, captchaText.height / 2);
      }

      let currentCaptcha = generateCaptcha();
      drawCaptcha(currentCaptcha);

      refreshButton.addEventListener('click', () => {
        userText.value = "";
        currentCaptcha = generateCaptcha();
        drawCaptcha(currentCaptcha);
        output.innerHTML = "";
        output.classList.remove("correctCaptcha", "incorrectCaptcha");
        submitActionButton.disabled = true;
      });

      function checkCaptchaMatch() {
        if (userText.value === currentCaptcha) {
          output.classList.remove("incorrectCaptcha");
          output.classList.add("correctCaptcha");
          output.innerHTML = "Correct!";
          submitActionButton.disabled = false;
        } else {
          output.classList.remove("correctCaptcha");
          output.classList.add("incorrectCaptcha");
          output.innerHTML = "Incorrect, please try again";
          submitActionButton.disabled = true;
        }
      }

      submitCaptchaButton.addEventListener('click', checkCaptchaMatch);

      userText.addEventListener('keyup', function (e) {
        if (e.key === "Enter") {
          checkCaptchaMatch();
        }
      });

      function validate() {
        let valid = true;
        let firstErrorField = null;

        const nameField = document.getElementById("name");
        const name_val = nameField.value.trim();
        if (name_val === "") {
          document.getElementById("error1").innerHTML = "*Please enter your full name here.";
          valid = false;
          firstErrorField = firstErrorField || nameField;
        } else if (name_val.length > 25) {
          document.getElementById("error1").innerHTML = "*Name cannot exceed 25 characters.";
          valid = false;
          firstErrorField = firstErrorField || nameField;
        }

        const companyField = document.getElementById("company");
        const company_val = companyField.value.trim();
        if (company_val !== "" && company_val.length > 50) {
          document.getElementById("error2").innerHTML = "*Company name cannot exceed 50 characters.";
          valid = false;
          firstErrorField = firstErrorField || companyField;
        }

        const websiteField = document.getElementById("website");
        const website_val = websiteField.value.trim();
        if (website_val !== "" && !/^https:\/\/[^\s]+$/.test(website_val)) {
          document.getElementById("error3").innerHTML = "*Website if included must be a secure URL starting with https://";
          valid = false;
          firstErrorField = firstErrorField || websiteField;
        }

        const emailField = document.getElementById("email");
        const email1_val = emailField.value.trim();
        if (email1_val === "") {
          document.getElementById("error4").innerHTML = "*Please enter your email address.";
          valid = false;
          firstErrorField = firstErrorField || emailField;
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email1_val)) {
          document.getElementById("error4").innerHTML = "*Please enter a valid email.";
          valid = false;
          firstErrorField = firstErrorField || emailField;
        }

        const reEmailField = document.getElementById("reemail");
        const email2_val = reEmailField.value.trim();
        if (email2_val === "") {
          document.getElementById("error5").innerHTML = "*Please retype your email address.";
          valid = false;
          firstErrorField = firstErrorField || reEmailField;
        } else if (email1_val !== email2_val) {
          document.getElementById("error5").innerHTML = "*Emails do not match.";
          valid = false;
          firstErrorField = firstErrorField || reEmailField;
        }

        const queryField = document.getElementById("query");
        const query_val = queryField.value.trim();
        if (query_val === "") {
          document.getElementById("error6").innerHTML = "*Please enter your query.";
          valid = false;
          firstErrorField = firstErrorField || queryField;
        }

        const captchaField = document.getElementById("captchaout");
        const captcha_val = captchaField.value.trim();
        if (captcha_val === "") {
          document.getElementById("error7").innerHTML = "*Please complete the CAPTCHA.";
          valid = false;
          firstErrorField = firstErrorField || captchaField;
        }

        return { valid, firstErrorField };
      }

      function clearErrors() {
        document.querySelectorAll(".errormessage").forEach(span => span.innerHTML = '');
      }

      form.addEventListener("submit", function (e) {
        clearErrors();
        const { valid, firstErrorField } = validate();

        if (!valid) {
          e.preventDefault();
          if (firstErrorField) {
            firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
            firstErrorField.focus();
          }
        } else {
          alert("Form submitted successfully!");
        }
      });