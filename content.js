chrome.runtime.sendMessage({ action: 'getTimer' }, (response) => {
    if (response && response.scheduledTime) {
        showCountdown(response.scheduledTime);
    }
});

function showCountdown(endTime) {
    const countdownDiv = document.createElement('div');
    countdownDiv.id = 'countdownDiv';
    countdownDiv.style.position = 'fixed';
    countdownDiv.style.bottom = '10px';
    countdownDiv.style.right = '10px';
    countdownDiv.style.padding = '10px';
    countdownDiv.style.backgroundColor = 'red';
    countdownDiv.style.color = 'white';
    countdownDiv.style.fontSize = '16px';
    countdownDiv.style.zIndex = '9999999999';
    countdownDiv.style.borderRadius = '5px';
    document.body.appendChild(countdownDiv);

    const intervalId = setInterval(() => {
        const now = Date.now();
        const timeLeft = Math.ceil((endTime - now) / 1000);

        if (timeLeft <= 0) {
            countdownDiv.textContent = "Closing...";
            clearInterval(intervalId);
        } else {
            countdownDiv.textContent = `${timeLeft}`;
        }
    }, 1000);
}

