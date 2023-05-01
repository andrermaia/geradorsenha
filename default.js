let passwordLength = 16
        const inputEl = document.querySelector("#password")
        const upperCaseCheckEl = document.querySelector("#uppercase-check")
        const numberCheckEl = document.querySelector("#number-check")
        const symbolCheckEl = document.querySelector("#symbol-check")
        const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")
        const passwordLengthTextEl = document.querySelector("#password-length-text")

        function generatePassword()
        {
            
            const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
            const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            const numberChars = "0123456789"
            const symbolChars = "?!@&*()[]"

            let password = ""
            let chars = lowercaseChars

            if(upperCaseCheckEl.checked)
                chars += uppercaseChars
            if(numberCheckEl.checked)
                chars += numberChars
            if(symbolCheckEl.checked)
                chars += symbolChars

            for(let i = 0; i < passwordLength; i++)
            {
                const randomNumber = Math.floor(Math.random() * chars.length)
                password += chars[randomNumber]
            }
            inputEl.value = password

            calculateQuality()
            calculateFontSize()
        }

        function calculateQuality()
        {
            passwordLen = Number(passwordLengthTextEl.innerHTML)
            const percent = Math.round(
                (passwordLen / 128) * 25 +
                (upperCaseCheckEl.checked? 25 : 0) + 
                (numberCheckEl.checked ? 15 : 0) + 
                (symbolCheckEl.checked ? 35 : 0) +
                (passwordLen <= 20 ? -50 + passwordLen: 0)
            )
            if(percent >= 100)
            {
                securityIndicatorBarEl.style.width = "100%"
                securityIndicatorBarEl.classList.add("completed")
            }
            else if(percent < 0)
            {
                securityIndicatorBarEl.style.width = "5%"
                securityIndicatorBarEl.classList.remove("completed")
            }
            else
            {
                securityIndicatorBarEl.style.width = percent+"%"
                securityIndicatorBarEl.classList.remove("completed")
            }

            if(percent > 74)
            {
                securityIndicatorBarEl.classList.remove("critical")
                securityIndicatorBarEl.classList.remove("warning")
                securityIndicatorBarEl.classList.add("safe")
            }
            else if (percent > 50)
            {
                securityIndicatorBarEl.classList.remove("critical")
                securityIndicatorBarEl.classList.add("warning")
                securityIndicatorBarEl.classList.remove("safe")
            }
            else
            {
                securityIndicatorBarEl.classList.add("critical")
                securityIndicatorBarEl.classList.remove("warning")
                securityIndicatorBarEl.classList.remove("safe")
            }
        }
        function calculateFontSize()
        {
            if(passwordLength > 45)
            {
                inputEl.classList.remove("font-sm")
                inputEl.classList.remove("font-xs")
                inputEl.classList.add("font-xxs")
            }
            else if (passwordLength > 32)
            {
                inputEl.classList.remove("font-sm")
                inputEl.classList.remove("font-xxs")
                inputEl.classList.add("font-xs")
            }
            else if (passwordLength > 22)
            {
                inputEl.classList.remove("font-xxs")
                inputEl.classList.remove("font-xs")
                inputEl.classList.add("font-sm")
            }
            else
            {
                inputEl.classList.remove("font-sm")
                inputEl.classList.remove("font-xs")
                inputEl.classList.remove("font-xxs")
            }
        }
        function copy()
        {
            navigator.clipboard.writeText(inputEl.value)
        }

        const passwordLengthEl = document.querySelector("#password-length")
        passwordLengthEl.addEventListener("input", function()
        {
            passwordLength = passwordLengthEl.value
            passwordLengthTextEl.innerHTML = passwordLength
            generatePassword()
        })
        upperCaseCheckEl.addEventListener("click", generatePassword)
        numberCheckEl.addEventListener("click", generatePassword)
        symbolCheckEl.addEventListener("click", generatePassword)

        document.querySelector("#copy-1").addEventListener("click", copy)
        document.querySelector("#copy-2").addEventListener("click", copy)
        document.querySelector("#renew").addEventListener("click", generatePassword)
        generatePassword()