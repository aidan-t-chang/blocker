document.addEventListener('DOMContentLoaded', () => {
    const settingsButton = document.getElementById('settingsButton');
    const backButton = document.getElementById('backButton');
    if (!backButton) {
        return;
    }
    if (!settingsButton) {
        return;
    }

    settingsButton.addEventListener('click', () => {
        document.getElementById('settingsDiv').style.display = 'block';
        document.getElementById('mainDiv').style.display = 'none';
    });

    backButton.addEventListener('click', () => {
        document.getElementById('settingsDiv').style.display = 'none';
        document.getElementById('mainDiv').style.display = 'block';
    });
});


