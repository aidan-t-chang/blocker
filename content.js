chrome.runtime.sendMessage({ action: 'getTimer' }, (response) => {
    if (response && response.scheduledTime) {
        showCountdown(response.scheduledTime);
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'timerStarted' && request.scheduledTime) {
        showCountdown(request.scheduledTime);
    }
});

function showCountdown(endTime) {
    const countdownDiv = document.createElement('div');
    countdownDiv.id = 'countdownDiv';
    countdownDiv.style.position = 'fixed';
    countdownDiv.style.top = '10px';
    countdownDiv.style.right = '10px';
    countdownDiv.style.padding = '20px';
    countdownDiv.style.backgroundColor = 'red';
    countdownDiv.style.color = 'white';
    countdownDiv.style.fontSize = '45px';
    countdownDiv.style.zIndex = '2147483647';
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

