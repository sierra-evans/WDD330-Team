// alerts.js
export function loadAlerts() {
    fetch('alerts.json')
        .then(response => response.json())
        .then(alerts => {
            if (!alerts || alerts.length === 0) return;

            const main = document.querySelector('main');
            if (!main) return; // safety check if main doesn't exist

            const section = document.createElement('section');
            section.classList.add('alert-list');

            alerts.forEach(alert => {
                const p = document.createElement('p');
                p.textContent = alert.message;

                p.style.backgroundColor = alert.backgroundColor;
                p.style.color = alert.foregroundColor || '#fff';

                section.appendChild(p);
            });

            // Insert alerts at the top of <main>
            main.prepend(section);
        })
        .catch(err => console.error('Error loading alerts:', err));
}
