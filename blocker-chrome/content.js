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
    const borderDiv = document.createElement('div');
    borderDiv.style.position = 'fixed';
    borderDiv.style.top = '0';
    borderDiv.style.left = '0';
    borderDiv.style.width = '100%';
    borderDiv.style.height = '100%';
    borderDiv.style.border = "8px solid red";
    borderDiv.style.boxSizing = "border-box";
    borderDiv.style.zIndex = '2147483646';
    borderDiv.style.pointerEvents = 'none';
    document.body.appendChild(borderDiv);
    const countdownDiv = document.createElement('div');
    countdownDiv.id = 'countdownDiv';
    countdownDiv.style.position = 'fixed';
    countdownDiv.style.lineHeight = 'normal';
    countdownDiv.style.top = '20px';
    countdownDiv.style.left = '20px';
    countdownDiv.style.padding = '25px';
    countdownDiv.style.backgroundColor = 'red';
    countdownDiv.style.color = 'white';
    countdownDiv.style.fontSize = '65px';
    countdownDiv.style.zIndex = '2147483647';
    countdownDiv.style.fontFamily = 'Segoe UI, sans-serif';
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

